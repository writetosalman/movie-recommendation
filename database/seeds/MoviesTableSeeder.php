<?php

use Illuminate\Database\Seeder;

class MoviesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies')->insert([
            'name'      => 'Moonlight',
            'email'     => str_random(10).'@gmail.com',
            'password'  => bcrypt('secret'),
        ]);
    }
}
