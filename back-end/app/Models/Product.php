<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductType;
use App\Models\Warehouse;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['product_name', 'quantity', 'expiration_date', 'description', 'barcode', 'warehouse_id', 'product_type_id'];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function outreach()
    {
        return $this->belongsToMany(Outreach::class);
    }

}
