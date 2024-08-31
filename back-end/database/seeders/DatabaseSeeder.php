<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityParticipant;
use App\Models\ActivityType;
use App\Models\Document;
use App\Models\DocumentType;
use App\Models\MessageSupermarket;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Supermarket;
use App\Models\SupermarketDisponibility;
use App\Models\User;
use App\Models\Warehouse;
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
            'type' => 1,
            'status' => 'approved'
        ]);

        User::factory()->create([
            // 'name' => 'Test beneficiary',
            'first_name' => 'Test',
            'last_name' => 'Beneficiary',
            'email' => 'beneficiary@example.com',
            'type' => 2,
            'status' => 'approved'
        ]);

        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Volunteer',
            'email' => 'volunteer@example.com',
            'type' => 3,
            'status' => 'approved'
        ]);

        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Partner',
            'email' => 'partner@example.com',
            'type' => 4,
            'status' => 'approved'
        ]);

        User::factory()->create([
            'first_name' => 'Banned',
            'last_name' => 'User',
            'email' => 'banned@example.com',
            'type' => 1,
            'banned' => true,
            'status' => 'approved'
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

        DocumentType::factory()->create([
            'name' => 'ID Card'
        ]);
        DocumentType::factory()->create([
            'name' => 'Ownership'
        ]);

        DocumentType::factory(4)->create();



        ProductType::factory()->create([
            'product_type' => 'Fruit'
        ]);

        Warehouse::factory()->create([
            'warehouse_name' => 'Warehouse 1',
            'location' => '23 rue longchamp, 75012, Paris',
        ]);

        Product::factory(4)->create([
            'warehouse_id' => 1,
            'product_type_id' => 1
        ]);

        ActivityType::factory()->create([
            'name' => 'bricolage'
        ]);
        ActivityType::factory()->create([
            'name' => 'cuisine'
        ]);
        ActivityType::factory()->create([
            'name' => 'partage vehicule'
        ]);
        ActivityType::factory()->create([
            'name' => 'gardiennage'
        ]);
        Activity::factory(10)->create();

        ActivityParticipant::factory(10)->create();



    }
}
