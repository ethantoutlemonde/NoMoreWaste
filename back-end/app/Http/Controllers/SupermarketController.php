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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supermarket $supermarket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supermarket $supermarket)
    {
        //
    }
}
