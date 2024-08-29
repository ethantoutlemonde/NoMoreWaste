<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => $this->faker->word(),
            'quantity' => $this->faker->randomNumber(2),
            'expiration_date' => $this->faker->date(),
            'description' => $this->faker->sentence(),
            'barcode' => $this->faker->randomNumber(8),
            'warehouse_id' => \App\Models\Warehouse::factory(),
            'product_type_id' => \App\Models\ProductType::factory(),
        ];
    }
}
