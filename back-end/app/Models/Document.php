<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'type_id',
        'user_id',
        'status',
    ];

    public function type() {
        return $this->belongsTo(DocumentType::class, 'type_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
