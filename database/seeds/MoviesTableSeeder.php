<?php

use Illuminate\Database\Seeder;
use \Carbon\Carbon;

class MoviesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Add movies
        \DB::table('movies')->insert([[
            'id'            => 1,
            'name'          => 'Moonlight',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
            'id'            => 2,
            'name'          => 'Zootopia',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            ],[
            'id'            => 3,
            'name'          => 'The Martian',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            ],[
            'id'            => 4,
            'name'          => 'Shaun The Sheep',
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            ]]);

        // Assign Genres
        \DB::table('genre_movie')->insert([[
            'movie_id'      => 1,
            'genre_id'      => 4,
        ],[
            'movie_id'      => 2,
            'genre_id'      => 1,
        ],[
            'movie_id'      => 2,
            'genre_id'      => 2,
        ],[
            'movie_id'      => 2,
            'genre_id'      => 3,
        ],[
            'movie_id'      => 3,
            'genre_id'      => 5,
        ],[
            'movie_id'      => 4,
            'genre_id'      => 2,
        ],[
            'movie_id'      => 4,
            'genre_id'      => 3,
        ]]);

        // Assign Show times
        \DB::table('movie_show_time')->insert([[
            'movie_id'      => 1,
            'show_time_id'  => 1,
        ],[
            'movie_id'      => 1,
            'show_time_id'  => 3,
        ],[
            'movie_id'      => 2,
            'show_time_id'  => 2,
        ],[
            'movie_id'      => 2,
            'show_time_id'  => 4,
        ],[
            'movie_id'      => 2,
            'show_time_id'  => 5,
        ],[
            'movie_id'      => 3,
            'show_time_id'  => 2,
        ],[
            'movie_id'      => 3,
            'show_time_id'  => 5,
        ],[
            'movie_id'      => 4,
            'show_time_id'  => 1,
        ],[
            'movie_id'      => 4,
            'show_time_id'  => 3,
        ],[
            'movie_id'      => 4,
            'show_time_id'  => 5,
        ]]);

        // Rating
        // Assign Show times
        \DB::table('ratings')->insert([[
            'movie_id'      => 1,
            'rating'        => 90,
        ],[
            'movie_id'      => 2,
            'rating'        => 70,
        ],[
            'movie_id'      => 3,
            'rating'        => 80,
        ],[
            'movie_id'      => 4,
            'rating'        => 75,
        ]]);
    }
}
