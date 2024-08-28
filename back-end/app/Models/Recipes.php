<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipes extends Model
{
    protected $fillable = ['name', 'ingredients', 'instructions'];

    public function getIngredientsAttribute($value)
    {
        return json_decode($value);
    }

    public function setIngredientsAttribute($value)
    {
        $this->attributes['ingredients'] = json_encode($value);
    }
}
