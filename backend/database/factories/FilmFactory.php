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
            "movieStatus" => $this->faker->boolean(),
            "duration" => $this->faker->name(),
            "studio" => $this->faker->streetAddress(),
            "protagonists" => $this->faker->words(5),
            "country" => $this->faker->city(),
            "premiere" => $this->faker->date(),
            "category" => $this->faker->name(),
            "genre" => $this->faker->name(),
            "rating" =>100,
            "director" =>$this->faker->name(),
            "producer" =>$this->faker->company(),
            "award" =>$this->faker->year(),
            "provider_id" => 1,
        ];
    }
}
