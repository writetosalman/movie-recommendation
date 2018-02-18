<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator;
use App\Core\Movies\Movie;
use App\Core\Movies\MovieService;

class ApiMovieController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }


    public function get(Request $request) {

        /**
         ***************************************************************
         * Validate user input
         ***************************************************************
         */
        $validator = Validator::make($request->all(), [
            'genre'                     => 'required',
            'showTime'                  => 'required|date',
        ], [
            'genre.required'            => 'Please provide movie genre',
            'showTime.required'         => 'Please provide movie showing time',
            'showTime.date'             => 'Please provide a valid date time',
        ]);
        if ($validator->fails()) {
            foreach ( $validator->errors()->get('*') as $field => $message ) {
                return response()->json(['success' => false, 'message' => $message[0]], 500);
            }
        }

        /**
         * Find movie show times based on genre and time
         */
        $movies = $this->movieService->getMoviesByGenreAndShowTime($request->input('genre'), $request->input('showTime'));

        if ( count($movies) <= 0 ) {
            return response()->json(['success' => false, 'message' => 'no movie recommendations'], 500);
        }

        return response()->json($movies, 200);
    }
}
