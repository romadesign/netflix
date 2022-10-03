<?php

namespace App\Models;
use App\Models\User;
use App\Models\Film;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function films(){
        return $this->hasMany(Film::class);
    }
}
