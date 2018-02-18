<?php

namespace App\Core\Movies;

use Illuminate\Support\Facades\DB;
use App\Core\Repositories\Repository;
use \Carbon\Carbon;

class MovieRepository extends Repository
{

    /**
     * Specify Model class name
     * @return mixed
     */
    function model()
    {
        return 'App\Core\Movies\Movie';
    }


    /**
     * This function returns movies matching genre and starting from showTime
     * @param $genre
     * @param $showTime
     * @return mixed
     */
    public function getMoviesByGenreAndShowTime($genre, $showTime) {
        //\DB::enableQueryLog();

        /**
         * Get All movies in genre required
         */
        $movieIds = $this->model
            ->whereHas('genres', function ($query) use ($genre) {
                $query->where('name', 'like', $genre);
            })
            ->select('movies.id AS id')
            ->get();

        /**
         * Convert movie IDs into array
         */
        $movieIdsArr = [];
        foreach ( $movieIds as $movieId ) {
            $movieIdsArr[] = $movieId->id;
        }

        /**
         * Get movies object based on movie IDs and also filter out SHOW TIMES
         */
        $movies     = $this->model
            ->with(['rating', 'genres', 'showTimes' => function ($query) use ($showTime)  {
                $query->where('show_time', '>=', $showTime);
            }])
            ->join('ratings',    'ratings.movie_id',    '=', 'movies.id')
            ->whereIn('movies.id', $movieIdsArr)
            ->select('movies.id AS id', 'movies.name AS name', 'ratings.rating AS rating')
            ->orderBy('ratings.rating', 'desc')
            ->get();
        //print_r(\DB::getQueryLog());

        return $this->getArrayInRequiredFormat($movies);
    }

    /**
     * This function just converts the movies object into requested format
     * This is an extra function and unnecessary if format is not required
     * @param $movies
     * @return mixed
     */
    private function getArrayInRequiredFormat($movies) {

        $arrMovies = [];
        foreach ($movies as $index => $movie) {

            // This movie has no genre, don't include it in the return array
            if ( !isset($movie->genres) || count($movie->genres) == 0 ) {
                continue;
            }

            // This movie has no showing, don't include it in the return array
            if ( !isset($movie->showTimes) || count($movie->showTimes) == 0 ) {
                continue;
            }

            $arrShowTimes = [];
            foreach ( $movie->showTimes as $showTime ) {
                $arrShowTimes[] = Carbon::parse($showTime->show_time)->format('d-m-Y h:ia');
            }

            $arrGenres = [];
            foreach ( $movie->genres as $genre ) {
                $arrGenres[] = $genre->name;
            }

            // All good assign to return array
            $arrMovies[] = [
                'name'      => $movie->name,
                'rating'    => $movie->rating,
                'genres'    => $arrGenres,
                'showings'  => $arrShowTimes,
            ];
        }

        return $arrMovies;
    }
}
