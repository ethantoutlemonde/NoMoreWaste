<?php

namespace App\Http\Controllers;

use App\Models\Recipes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    // Méthode pour suggérer un menu
    public function suggestMenu(Request $request)
    {
        
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
