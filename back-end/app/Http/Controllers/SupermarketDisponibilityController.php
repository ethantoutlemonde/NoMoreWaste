<?php

namespace App\Http\Controllers;

use App\Models\SupermarketDisponibility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class SupermarketDisponibilityController extends Controller
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
            'date' => [
            'required',
            'date',
            'after_or_equal:today',
            Rule::unique('supermarket_disponibilities')->where(function ($query) use ($request) {
                return $query->where('supermarket_id', $request->supermarket_id);
            }),
            ],
            'supermarket_id' => 'required|exists:supermarkets,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        $supermarketDisponibility = SupermarketDisponibility::create([
            'date' => $request->date,
            'supermarket_id' => $request->supermarket_id,
        ]);

        return response()->json(['success' => 'Supermarket Disponibility successfully added', 'disponibility' => $supermarketDisponibility ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(SupermarketDisponibility $disponibility)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SupermarketDisponibility $disponibility)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SupermarketDisponibility $disponibility)
    {
        $disponibility->delete();
        return response()->json(['success' => 'Supermarket Disponibility successfully deleted'], 200);
    }
}
