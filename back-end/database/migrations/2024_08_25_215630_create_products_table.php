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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->integer('quantity');
            $table->date('expiration_date');
            $table->string('description')->nullable();
            $table->string('barcode')->nullable();
            // $table->foreignId('food_collection_id')->nullable()->constrained();
            $table->foreignId('product_type_id')->nullable()->constrained()->casscadeOnDelete();
            $table->foreignId('warehouse_id')->nullable()->constrained()->casscadeOnDelete();
            // $table->foreignId('food_aids_id')->nullable()->constrained();
            // $table->integer('Quantity_Maraude')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
