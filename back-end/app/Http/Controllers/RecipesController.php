<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\Recipes;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RecipesController extends Controller
{
    public function index()
    {
        $recipes = Recipes::all();
        return response()->json($recipes);
    }

    public function show(Recipes $recipe)
    {
        return response()->json($recipe);
    }

    public function getRecipesByWarehouse(Warehouse $warehouse)
    {

        // $warehouseProducts = Product::where('warehouse_id', $warehouse->id)->pluck('product_type_id');
        // $productTypeArray = [];

        // foreach ($warehouseProducts as $warehouseProduct) {
        //     $productTypeArray[] = ProductType::where('id', $warehouseProduct)->pluck('product_type')->first();
        // }

        // if (empty($productTypeArray)) {
        //     return response()->json(['error' => 'Warehouse is empty'], 404);
        // }

        // // return all recipes where all ingredients are in warehouse
        // $recipes = Recipes::all()->filter(function ($recipe) use ($productTypeArray) {
        //     $recipeIngredients = $recipe->ingredients;
        //     $recipe->available = true;

        //     foreach ($recipeIngredients as $ingredient) {
        //         $ingredientExists = false;

        //         foreach ($productTypeArray as $productType) {
        //             if (strtolower($productType) === $ingredient) {
        //                 $ingredientExists = true;
        //                 break;
        //             }
        //         }

        //         if (!$ingredientExists) {
        //             $recipe->available = false;
        //             break;
        //         }
        //     }

        //     return $recipe->available;
        //     })->values();  // Utilisation de values() pour réindexer

        //     if ($recipes->isEmpty()) {
        //         return response()->json(['error' => 'No recipes available'], 404);
        //     }

        //     return response()->json($recipes);
        //         // return response()->json([$productTypeArray, $recipes]);


    $warehouseProducts = Product::where('warehouse_id', $warehouse->id)
        ->where('expiration_date', '>=', now())
        ->where('quantity', '>', 0)
        ->pluck('product_type_id');

    $productTypeArray = [];

    foreach ($warehouseProducts as $warehouseProduct) {
        $productTypeArray[] = ProductType::where('id', $warehouseProduct)
            ->pluck('product_type')
            ->first();
    }

    if (empty($productTypeArray)) {
        return response()->json(['error' => 'Warehouse is empty, all products are expired, or all quantities are zero'], 404);
    }

    // Filter recipes based on available (and non-expired, non-zero quantity) ingredients
    $recipes = Recipes::all()->filter(function ($recipe) use ($productTypeArray) {
        $recipeIngredients = $recipe->ingredients;
        $recipe->available = true;

        foreach ($recipeIngredients as $ingredient) {
            $ingredientExists = false;

            foreach ($productTypeArray as $productType) {
                if (strtolower($productType) === $ingredient) {
                    $ingredientExists = true;
                    break;
                }
            }

            if (!$ingredientExists) {
                $recipe->available = false;
                break;
            }
        }

        return $recipe->available;
    })->values();  // Re-index the collection

    if ($recipes->isEmpty()) {
        return response()->json(['error' => 'No recipes available'], 404);
    }

    return response()->json($recipes);


        
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:recipes,name',
            'ingredients' => 'required|array|min:1',
            'ingredients.*' => 'string|distinct',
            'instructions' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $recipe = Recipes::create([
            'name' => $request->input('name'),
            'ingredients' => $request->input('ingredients'),
            'instructions' => $request->input('instructions'),
        ]);

        return response()->json(['recipe' => $recipe], 201);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipes::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:recipes,name,' . $id,
            'ingredients' => 'required|array|min:1',
            'ingredients.*' => 'string|distinct',
            'instructions' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $recipe->update([
            'name' => $request->input('name'),
            'ingredients' => $request->input('ingredients'),
            'instructions' => $request->input('instructions'),
        ]);

        return response()->json(['recipe' => $recipe], 200);
    }

    public function destroy($id)
    {
        $recipe = Recipes::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }

        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully'], 200);
    }
}
