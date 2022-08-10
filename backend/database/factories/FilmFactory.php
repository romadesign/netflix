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
            "backdrop_path" => 'https://guide-in-dubai.com/wp-content/uploads/2020/05/IMG-Worlds-of-Adventure-guide-in-dubai.jpeg',
            "poster_path" => 'https://guide-in-dubai.com/wp-content/uploads/2020/05/IMG-Worlds-of-Adventure-guide-in-dubai.jpeg',
            "movieStatus" => $this->faker->boolean(),
            "duration" => $this->faker->name(),
            "studio" => $this->faker->streetAddress(),
            "protagonists" => "[\"Roma\",\"Ramiro\",\"Nicolas\"]",
            "country" => $this->faker->city(),
            "premiere" => $this->faker->date(),
            "genre" => "[\"Mart\",\"Reresa\",\"Jose\"]",
            "rating" =>100,
            "director" =>$this->faker->name(),
            "producer" =>$this->faker->company(),
            "award" =>$this->faker->year(),
        ];
    }
}
