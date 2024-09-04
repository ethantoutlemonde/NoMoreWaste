<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function documents() {
        return $this->hasMany(Document::class, 'type_id');
    }

    public function activityTypes() {
        return $this->belongsToMany(ActivityType::class, 'activity_type_document_types');
    }

}
