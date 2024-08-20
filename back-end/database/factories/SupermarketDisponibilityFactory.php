<?php

namespace Database\Factories;

use App\Models\Supermarket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SupermarketDisponibility>
 */
class SupermarketDisponibilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'supermarket_id' => Supermarket::inRandomOrder()->first()->id,
            'date' => fake()->date()
        ];
    }
}
