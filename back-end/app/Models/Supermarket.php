<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supermarket extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'address',
        'phone',
        'banned'
    ];

    public function disponibilities() {
        return $this->hasMany(SupermarketDisponibility::class, 'supermarket_id');
    }

    public function foodColletions() {
        return $this->belongsToMany(FoodCollection::class);
    }

    public function messages() {
        return $this->hasMany(MessageSupermarket::class, 'supermarket_id');
    }
}
