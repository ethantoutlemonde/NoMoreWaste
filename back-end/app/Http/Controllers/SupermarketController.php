<?php

namespace App\Http\Controllers;

use App\Models\Supermarket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupermarketController extends Controller
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
            'email' => 'required|string|email|max:255',
            'address' => 'required|string|max:255|unique:supermarkets',
            'phone' => ['required','regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/'],
        ],
        [

        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        $supermarket = Supermarket::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone
        ]);
        return response()->json(['success' => 'Supermarket succesfully added' ], 200);
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
        $data = $request->all();
        $supermarket = $supermarket->first();

        if (!$supermarket) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255|unique:supermarkets,address,' . $supermarket->id,
            'email' => 'required|string|email|max:255|unique:supermarkets,email,' . $supermarket->id,
            'phone' => ['required','regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/', 'unique:supermarkets,phone,' . $supermarket->id],
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }
        
        $supermarket->name = $request->input('name');
        $supermarket->email = $request->input('email');
        $supermarket->phone = $request->input('phone');
        $supermarket->address = $request->input('address');
        $supermarket->save();

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
