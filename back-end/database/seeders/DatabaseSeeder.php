<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use App\Models\MessageSupermarket;
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
            // 'name' => 'Test User',
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'type' => 1
        ]);

        User::factory()->create([
            // 'name' => 'Test beneficiary',
            'first_name' => 'Test',
            'last_name' => 'Beneficiary',
            'email' => 'beneficiary@example.com',
            'type' => 2
        ]);

        User::factory()->create([
            // 'name' => 'Test volunteer',
            'first_name' => 'Test',
            'last_name' => 'Volunteer',
            'email' => 'volunteer@example.com',
            'type' => 3
        ]);

        User::factory()->create([
            // 'name' => 'Test volunteer',
            'first_name' => 'Test',
            'last_name' => 'Partner',
            'email' => 'partner@example.com',
            'type' => 4
        ]);

        User::factory()->create([
            // 'name' => 'Banned User',
            'first_name' => 'Banned',
            'last_name' => 'User',
            'email' => 'banned@example.com',
            'type' => 1,
            'banned' => true
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

        MessageSupermarket::factory(10)->create();

        MessageSupermarket::factory(10)->create([
            'admin_id' => null
        ]);

        DocumentType::factory(4)->create();


    }
}
