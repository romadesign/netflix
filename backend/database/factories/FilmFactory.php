<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FilmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "title" => $this->faker->title(),
            "description" => $this->faker->text(40),
            "provider_id" => 1,
            "categorie_id" => 1,
            "backdrop_path" => $this->faker->imageUrl(1200, 700),
            "poster_path" => $this->faker->imageUrl(200, 300),
            "movieStatus" => $this->faker->boolean(),
            "duration" => $this->faker->name(),
            "studio" => $this->faker->streetAddress(),
            "protagonists" => $this->faker->words(5),
            "country" => $this->faker->city(),
            "premiere" => $this->faker->date(),
            "genre" => $this->faker->name(),
            "rating" =>100,
            "director" =>$this->faker->name(),
            "producer" =>$this->faker->company(),
            "award" =>$this->faker->year(),
        ];
    }
}
