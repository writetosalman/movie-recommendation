<?php

namespace App\Core\Genres;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    /**
     * The table associated with the model
     * @var string
     */
    protected $table = 'genres';

    /**
     * Hide this information from toArray and JSON
     * @var array
     */
    protected $hidden = array('id', 'pivot');

    /**
     * Indicates if the model should be timestamped.
     * @var bool
     */
    public $timestamps = false;

    /**
     * Get the movies that have a genre
     */
    public function movies()
    {
        return $this->belongsToMany('App\Core\Movies\Movie');
    }
}
