<?php

use Illuminate\Database\Seeder;
use \Carbon\Carbon;

class ShowTimesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get date after 3 days
        $date = Carbon::now()->addDays(3)->format('Y-m-d');

        // Show times
        $arrTime = [
            $date.' 18:00:00',
            $date.' 19:00:00',
            $date.' 20:00:00',
            $date.' 21:00:00',
            $date.' 22:00:00'
            ];

        foreach ( $arrTime as $index=>$time) {
            \DB::table('show_times')->insert([
                'id'        => ($index+1),
                'show_time' => $time,
            ]);
        }
    }
}
