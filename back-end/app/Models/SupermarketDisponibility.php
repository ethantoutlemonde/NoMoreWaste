<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupermarketDisponibility extends Model
{
    use HasFactory;

    public function supermarket() {
        return $this->belongsTo(Supermarket::class);
    }
}
