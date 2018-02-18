<?php

use Illuminate\Database\Seeder;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arrNames = ['Action & Adventure', 'Animation', 'Comedy', 'Drama', 'Science Fiction & Fantasy'];

        foreach ( $arrNames as $index=>$name) {
            \DB::table('genres')->insert([
                'id'        => ($index+1),
                'name'      => $name,
            ]);
        }
    }
}
