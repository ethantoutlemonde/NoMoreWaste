<?php

namespace App\Http\Controllers;

use App\Models\FoodAid;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        // get all product with join warehouse and product type
        $products = Product::with('warehouse', 'productType')->get();
        //$products = Product::all();
        return response()->json($products, 200);
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
        $rules = [
            'product_name' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'product_type_id' => 'required|integer',
            'warehouse_id' => 'required|integer',
            'expiration_date' => 'required|date|after_or_equal:today',
            'barcode' => 'required|string',
        ];
    
        $messages = [
            'expiration_date.after_or_equal' => 'expiration date need is before or equal to today.',
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $existingProduct = Product::where('barcode', $request->barcode)->first();
    
        if ($existingProduct) {
            return response()->json(['error' => 'Product already exist'], 400);
        }
    
        $product = Product::firstOrCreate($validator->validated());
    
        return response()->json($product, 201);
    }
    
    
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $product = Product::find($id);

        // if (!$product) {
        //     return response()->json(['error' => 'Product not found'], 404);
        // }

        // return response()->json($product, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id)
    // {
    //     $product = Product::findOrFail($id);
    
    //     $rules = [
    //         'product_name' => 'string',
    //         'description' => 'string',
    //         'quantity' => 'integer|min:0',
    //         'product_type_id' => 'integer',
    //         'warehouse_id' => 'integer',
    //         'expiration_date' => 'date|after_or_equal:today',
    //         'barcode' => 'string',
    //     ];
    
    //     $messages = [
    //         'expiration_date.after_or_equal' => 'Expiration date must be today or later.',
    //     ];
    
    //     $validator = Validator::make($request->all(), $rules, $messages);
    
    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 400);
    //     }
    //     $validatedData = $validator->validated();
    //     if (isset($validatedData['Quantity_Maraude'])) {
    //         $difference = $validatedData['Quantity_Maraude'] - $product->Quantity_Maraude;
    //         if ($difference <= $product->quantity) {
    //             $product->quantity -= $difference;
    //             $product->Quantity_Maraude = $validatedData['Quantity_Maraude'];
    //         } else {
    //             return response()->json(['errors' => ['Quantity_Maraude' => 'Quantity_Maraude cannot exceed quantity.']], 400);
    //         }
    //     }
    //     $product->update($validatedData);
    //     return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    // }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $rules = [
            'product_name' => 'string',
            'description' => 'string',
            'quantity' => 'integer|min:0',
            'product_type_id' => 'integer',
            'warehouse_id' => 'integer',
            'expiration_date' => 'date|after_or_equal:today',
            'barcode' => 'string',
            'Quantity_Maraude' => 'integer|min:0',
        ];

        $messages = [
            'expiration_date.after_or_equal' => 'Expiration date must be today or later.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();

        if (isset($validatedData['Quantity_Maraude'])) {
            $difference = $validatedData['Quantity_Maraude'] - $product->Quantity_Maraude;
            if ($difference <= $product->quantity) {
                $product->quantity -= $difference;
                $product->Quantity_Maraude = $validatedData['Quantity_Maraude'];
            } else {
                return response()->json(['errors' => ['Quantity_Maraude' => 'Quantity_Maraude cannot exceed quantity.']], 400);
            }
        }

        $product->update($validatedData);

        if ($product->quantity <= 0) {
            $product->delete();
            return response()->json(['message' => 'Product deleted due to zero quantity.'], 200);
        }

        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }

    
    
    
    
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function addMaraude(Request $request){
        foreach ($request->product_ids as $productId) {
            $product = Product::find($productId);
            $product->update(['food_aids_id' => $request->maraude_id]);
        }
        return response()->json(['message' => 'Products added to maraude successfully'], 200);
    }
    
}
