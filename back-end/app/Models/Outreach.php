<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outreach extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'start_time'
    ];

    public function products() {
        return $this->belongsToMany(Product::class, 'outreach_products')->withPivot('quantity');;
    }

    public function participants() {
        return $this->belongsToMany(User::class, 'outreach_participants', 'outreach_id', 'volunteer_id');
    }
}
