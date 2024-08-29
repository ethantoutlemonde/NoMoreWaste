<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupermarketDisponibility extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'supermarket_id'
    ];

    public function supermarket() {
        return $this->belongsTo(Supermarket::class);
    }
}
