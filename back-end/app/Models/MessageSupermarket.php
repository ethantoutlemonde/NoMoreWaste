<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageSupermarket extends Model
{
    use HasFactory;

    protected $fillable = [
        'supermarket_id',
        'admin_id',
        'message',
    ];

    public function supermarket() {
        return $this->belongsTo(Supermarket::class);
    }

    public function admin() {
        return $this->belongsTo(User::class);
    }
}
