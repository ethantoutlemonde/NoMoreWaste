<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // 'name',
        'first_name',
        'last_name',
        'email',
        'password',
        'type',
        'phone',
        'banned',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function checkAndApprovePartner()
    {
        // Vérifier si l'utilisateur est de type 4
        if ($this->type !== 4) {
            return;
        }

        // Récupérer les documents de type 1 et 2
        $documentType1 = $this->documents()->where('type_id', 1)->first();
        $documentType2 = $this->documents()->where('type_id', 2)->first();

        // return $documentType1;

        // Vérifier si les documents de type 1 et 2 sont approuvés
        if ($documentType1 && $documentType1->status === 'approved' && 
            $documentType2 && $documentType2->status === 'approved') {
            
            // Approuver l'utilisateur
            $this->status = 'approved';
            $this->save();
        } else {
            // Rejeter l'utilisateur
            $this->status = 'rejected';
            $this->save();
        }
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            // Supprimer les fichiers liés aux documents de l'utilisateur
            foreach ($user->documents as $document) {
                Storage::delete($document->path);
            }
        });
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(MessageSupermarket::class, 'admin_id');
    }

    public function supermarkets()
    {
        return $this->hasMany(Supermarket::class, 'user_id');
    }

    public function activities()
    {
        return $this->hasMany(Activity::class, 'creator_id');
    }

    public function participeActivity()
    {
        return $this->belongsToMany(ActivityParticipant::class, 'user_id');
    }
}
