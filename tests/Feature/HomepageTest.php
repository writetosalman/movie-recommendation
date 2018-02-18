<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HomepageTest extends TestCase
{
    /**
     * A test for homepage status.
     *
     * @return void
     */
    public function testHomepageStatus()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
