<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GenreFilmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
            return [
                "genre_id" =>random_int(1, 10),
                "film_id" =>random_int(1, 100),
            ];
    }
}
