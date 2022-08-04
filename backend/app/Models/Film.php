<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'backdrop_path',
        'poster_path',
        'movieStatus',
        'duration',
        'studio',
        'protagonists',
        'country',
        'premiere',
        'category',
        'genre',
        'rating',
        'director',
        'producer',
        'award',
        'provider_id',
    ];

    protected $casts = [
        'protagonists' => 'array',
        'genre' => 'array',
        'category' => 'array',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
