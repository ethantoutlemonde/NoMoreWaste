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

    public function show($id)
    {
        $recipe = Recipes::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }

        return response()->json(['recipe' => $recipe], 200);
    }

    public function getRecipesByWarehouse(Warehouse $warehouse)
    {
        $productTypes = DB::table('products')
            ->join('product_types', 'products.product_type_id', '=', 'product_types.id')
            ->select('product_types.product_type')
            ->where('products.warehouse_id', $warehouse->id)
            ->distinct()
            ->get();

        $recipes = Recipes::all()->pluck('ingredients');

        // compare if recipe ingredients are in warehouse
        //explode(): Argument #2 ($string) must be of type string, array given"

        foreach ($recipes as $recipe) {
            // $recipeIngredients = explode(',', $recipe);
            // $recipeIngredients = array_map('trim', $recipeIngredients);
            // $recipeIngredients = array_map('strtolower', $recipeIngredients);

            $recipe->available = true;

            foreach ($recipe as $ingredient) {
                $ingredientExists = false;

                foreach ($productTypes as $productType) {
                    if (strtolower($productType->product_type) === $ingredient) {
                        $ingredientExists = true;
                        break;
                    }
                }

                if (!$ingredientExists) {
                    $recipe->available = false;
                    break;
                }
            }
        }

        return response()->json([$productTypes, $recipes]);
        
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
