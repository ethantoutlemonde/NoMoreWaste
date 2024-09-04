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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable();
            $table->text("description")->nullable();
            $table->integer("max_participants")->nullable();
            $table->datetime("start_datetime")->nullable();
            $table->datetime("end_datetime")->nullable();
            $table->string("adress")->nullable();
            $table->string("city")->nullable();
            $table->string("country")->nullable();
            $table->string("postal_code")->nullable();
            $table->foreignId("activity_type_id")->casscadeOnDelete();
            $table->foreignId("creator_id")->constrained("users")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
