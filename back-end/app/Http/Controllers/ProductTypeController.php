<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productTypes = ProductType::all();
        return response()->json(['productTypes' => $productTypes], 200);
    }


    public function getAll(){
        return ProductType::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_type' => 'required|string|max:255|unique:product_types',
        ], [
            'product_type.required' => 'Le champ du type de produit est requis.',
            'product_type.string' => 'Le champ du type de produit doit être une chaîne de caractères.',
            'product_type.max' => 'Le champ du type de produit ne peut pas dépasser :max caractères.',
            'product_type.unique' => 'Ce type de produit existe déjà.',
        ]);

        $productType = ProductType::create($request->all());
        return response()->json(['message' => 'Product type created successfully', 'productType' => $productType], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductType $productType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductType $productType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'product_type' => 'required|string|max:255|unique:product_types,product_type,' . $id,
        ], [
            'product_type.required' => 'Le champ du type de produit est requis.',
            'product_type.string' => 'Le champ du type de produit doit être une chaîne de caractères.',
            'product_type.max' => 'Le champ du type de produit ne peut pas dépasser :max caractères.',
            'product_type.unique' => 'Ce type de produit existe déjà.',
        ]);

        $productType = ProductType::findOrFail($id);
        $productType->update($request->all());
        return response()->json(['message' => 'Product type updated successfully', 'productType' => $productType], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productType = ProductType::findOrFail($id);
        
        try {
            $productType->delete();
            return response()->json(['message' => 'Product type deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the product type'], 500);
        }
    }
}
