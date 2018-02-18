<?php

namespace App\Core\ShowTimes;

use Illuminate\Database\Eloquent\Model;

class ShowTime extends Model
{
    /**
     * The table associated with the model
     * @var string
     */
    protected $table = 'show_times';

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
     * Get the movies that have a show time
     */
    public function movies()
    {
        return $this->belongsToMany('App\Core\Movies\Movie');
    }
}
