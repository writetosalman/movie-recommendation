<?php

namespace App\Core\Ratings;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    /**
     * The table associated with the model
     * @var string
     */
    protected $table = 'ratings';

    /**
     * Indicates if the model should be timestamped.
     * @var bool
     */
    public $timestamps = false;

    /**
     * Get the movies that have a rating
     */
    public function movies()
    {
        return $this->belongsTo('App\Core\Movies\Movie');
    }
}
