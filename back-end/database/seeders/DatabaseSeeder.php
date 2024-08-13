<?php

namespace Database\Seeders;

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

    }
}
