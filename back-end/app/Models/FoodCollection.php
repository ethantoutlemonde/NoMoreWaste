<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'date'
    ];

    public function supermarkets() {
        return $this->belongsToMany(Supermarket::class);
    }
}
