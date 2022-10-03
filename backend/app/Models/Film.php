<?php

namespace App\Models;

use App\Models\User;
use App\Models\Categorie;
use App\Models\Genre;
use App\Models\Account;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'provider_id',
        'categorie_id',
        'backdrop_path',
        'poster_path',
        'movieStatus',
        'duration',
        'studio',
        'protagonists',
        'country',
        'premiere',
        // 'category',
        'genre',
        'rating',
        'director',
        'producer',
        'award',
    ];

    protected $casts = [
        'protagonists' => 'array',
        'genre' => 'array',
        // 'category' => 'array',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function account(){
        return $this->belongsTo(Account::class);
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }

    public function genres() {
        return $this->belongsToMany(Genre::class, 'genre_film');
    }
}

