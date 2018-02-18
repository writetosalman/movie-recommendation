<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MovieTest extends TestCase
{
    /**
     * A basic test to check api /movies.
     *
     * @return void
     */
    public function testMovieStatus()
    {
        // Find from back date so that results are returned
        $response = $this->get('/api/movies?genre=Animation&showTime=2018-02-01T00:09:00');
        $response->assertStatus(200);
    }
}
