<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'max_participants',
        'start_datetime',
        'end_datetime',
        'adress',
        'city',
        'country',
        'postal_code',
        'activity_type_id',
        'creator_id',

    ];

    public function activityType()
    {
        return $this->belongsTo(ActivityType::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'activity_participants');
    }
}
