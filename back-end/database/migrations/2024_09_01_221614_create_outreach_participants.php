<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('outreach_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outreach_id')->constrained()->casscadeOnDelete();
            $table->foreignId('volunteer_id')->constrained('users')->casscadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outreach_participants');
    }
};
