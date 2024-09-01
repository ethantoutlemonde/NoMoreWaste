<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'start_time'
    ];

    public function supermarkets() {
        return $this->belongsToMany(Supermarket::class);
    }

    public function participants() {
        return $this->belongsToMany(User::class, 'food_collection_participants', 'food_collection_id', 'volunteer_id');
    }
}
