<?php

namespace App\Core\Movies;

use Exception;
use \Carbon\Carbon;

class MovieService
{
    protected $movieRepository;

    /**
     * MovieService constructor.
     * We can add any dependency injection here
     * @param MovieRepository
     */
    public function __construct(MovieRepository $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

    /**
     * This function returns movies matching genre and starting after 30 minutes from showTime
     * @param $genre
     * @param $showTime
     * @return mixed
     */
    public function getMoviesByGenreAndShowTime($genre, $showTime) {

        $next30Min = Carbon::parse($showTime)->addMinutes(30);
        return $this->movieRepository->getMoviesByGenreAndShowTime($genre, $next30Min->toDateTimeString());
    }
}