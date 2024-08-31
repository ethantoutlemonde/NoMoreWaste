<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodCollectionParticipant extends Model
{
    use HasFactory;

    protected $fillable = ['food_collection_id', 'volunteer_id'];


}
