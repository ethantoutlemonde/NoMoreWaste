<?php

namespace App\Http\Controllers;

use App\Models\Supermarket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupermarketAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Supermarket::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255|unique:supermarkets',
            'city' => 'required|string|max:255',
            'postal_code' => ['required','string','regex:/^\d{5}$/'],
            'country' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:supermarkets',
            'phone' => ['required', 'regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/'],
            'siret' => 'required|string|max:14|min:14|unique:supermarkets',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }
    
        $supermarket = Supermarket::create([
            'name' => $request->name,
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
            'email' => $request->email,
            'phone' => $request->phone,
            'siret' => $request->siret,
        ]);
    
        return response()->json(['success' => 'Supermarket successfully added'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supermarket $supermarketAdmin)
    {
        return $supermarketAdmin;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supermarket $supermarketAdmin)
    {
        $data = $request->all();

        if (!$supermarketAdmin) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255|unique:supermarkets,address,' . $supermarketAdmin->id,
            'email' => 'required|string|email|max:255|unique:supermarkets,email,' . $supermarketAdmin->id,
            'city' => 'required|string|max:255',
            'postal_code' => ['required','string','regex:/^\d{5}$/'],
            'country' => 'required|string|max:255',
            'phone' => ['required','regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/', 'unique:supermarkets,phone,' . $supermarketAdmin->id],
            'siret' => 'required|string|max:14|min:14|unique:supermarkets,siret,' . $supermarketAdmin->id,
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }
        $supermarketAdmin->update($request->all());

        return response()->json(['success' => 'Supermarket succesfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supermarket $supermarketAdmin)
    {
        $supermarketAdmin->delete();
        return response()->json(['success' => 'Supermarket succesfully deleted'], 200);
    }

    public function ban(Request $request, Supermarket $supermarketAdmin)
    {
        // Logique pour bannir l'utilisateur
        // Par exemple, marquer l'utilisateur comme banni dans la base de données
        $supermarketAdmin->update($request->all());
    
        return response()->json(['message' => 'Supermarket banned successfully.']);
    }
}
