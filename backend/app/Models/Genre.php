<?php

namespace App\Models;
use App\Models\Film;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
    ];

    public function films() {
        return $this->belongsToMany(Film::class, 'genre_film');
     }
}
