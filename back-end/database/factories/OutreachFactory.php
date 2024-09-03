<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Outreach>
 */
class OutreachFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // a date max 30 days in the future
            'date' => fake()->dateTimeBetween("now", "+30 days")->format('Y-m-d'),
            "start_time" => fake()->time('H:i'),
            "address" => fake()->address(),
            "city" => fake()->city(),
            "country" => fake()->country(),
            "postal_code" => fake()->randomNumber(5),
        ];
    }
}
