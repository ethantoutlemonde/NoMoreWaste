<?php

namespace Database\Factories;

use App\Models\Supermarket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MessageSupermarket>
 */
class MessageSupermarketFactory extends Factory
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
            'admin_id' => User::where('type', 1)->inRandomOrder()->first()->id,
            'message' => $this->faker->text(),
        ];
    }
}
