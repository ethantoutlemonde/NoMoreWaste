<?php

namespace Database\Factories;

use App\Models\ActivityType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'max_participants' => fake()->numberBetween(1, 100),
            'start_datetime' => fake()->dateTime(),
            'end_datetime' => fake()->dateTime(),
            'adress' => fake()->address(),
            'city' => fake()->city(),
            'country' => fake()->country(),
            'postal_code' => fake()->postcode(),
            'activity_type_id' => ActivityType::inRandomOrder()->first()->id,
            'creator_id' => User::where('type', 3)->inRandomOrder()->first()->id,
        ];
    }
}
