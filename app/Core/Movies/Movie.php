<?php

namespace App\Core\Movies;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{

    /**
     * The table associated with the model
     * @var string
     */
    protected $table = 'movies';

    /**
     * Each movie can have many genres
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function genres() {
        return $this->belongsToMany('App\Core\Genres\Genre');
    }

    /**
     * Each movie can have many show times
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function showTimes() {
        return $this->belongsToMany('App\Core\ShowTimes\ShowTime');
    }

    /**
     * Each movie can have one rating
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function rating() {
        return $this->hasOne('App\Core\Ratings\Rating');
    }
}
