<?php

namespace App\Http\Controllers;

use App\Models\Supermarket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SupermarketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'user_id' => $request->user()->id,
        ]);
    
        return response()->json(['success' => 'Supermarket successfully added'], 200);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Supermarket $supermarket)
    {
        return $supermarket;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supermarket $supermarket)
    {

        if (!$supermarket) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255|unique:supermarkets,address,' . $supermarket->id,
            'email' => 'required|string|email|max:255|unique:supermarkets,email,' . $supermarket->id,
            'city' => 'required|string|max:255',
            'postal_code' => ['required','string','regex:/^\d{5}$/'],
            'country' => 'required|string|max:255',
            'phone' => ['required','regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/', 'unique:supermarkets,phone,' . $supermarket->id],
            'siret' => 'required|string|max:14|min:14|unique:supermarkets,siret,' . $supermarket->id,
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }
        $supermarket->update($request->all());

        return response()->json(['success' => 'Supermarket succesfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supermarket $supermarket)
    {
        $supermarket->delete();
        return response()->json(['success' => 'Supermarket succesfully deleted'], 200);
    }
}
