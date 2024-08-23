<?php

namespace Database\Seeders;

use App\Models\Supermarket;
use App\Models\SupermarketDisponibility;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'type' => 1
        ]);

        User::factory()->create([
            'name' => 'Test beneficiary',
            'email' => 'beneficiary@example.com',
            'type' => 2
        ]);

        User::factory()->create([
            'name' => 'Test volunteer',
            'email' => 'volunteer@example.com',
            'type' => 3
        ]);

        Supermarket::factory()->create([
            'name' => 'Auchan',
            'address' => '23 rue longchamp, 75012, Paris',
            'email' => 'auchan@example.com',
            'phone' => '0139847387'
        ]);
        Supermarket::factory()->create([
            'name' => 'Carrefour',
            'address' => '2 rue du paradis, 89000',
            'email' => 'carrefour@example.com',
            'phone' => '0139847387'
        ]);

        SupermarketDisponibility::factory(2)->create([
            'date' => '2024-08-24'
        ]);

        SupermarketDisponibility::factory(2)->create();

    }
}
