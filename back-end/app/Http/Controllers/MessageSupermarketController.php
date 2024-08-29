<?php

namespace App\Http\Controllers;

use App\Models\MessageSupermarket;
use App\Models\Supermarket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageSupermarketController extends Controller
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
    public function store(Request $request , Supermarket $supermarket)
    {
        // Valider les données
        $validator = Validator::make($request->all(), [
            'admin_id' => 'nullable|integer',
            'message' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        $message = MessageSupermarket::create([
            'supermarket_id' => $supermarket->id,
            'admin_id' => $request->admin_id,
            'message' => $request->message
        ]);
        $message->load('admin', 'supermarket');

        // Retournez le message avec les relations chargées
        return response()->json(['success' => 'Message successfully sent', 'message' => $message], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MessageSupermarket $messageSupermarket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MessageSupermarket $messageSupermarket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MessageSupermarket $messageSupermarket)
    {
        //
    }

    public function allMessages(Supermarket $supermarket)
    {
        return MessageSupermarket::where('supermarket_id', $supermarket->id)
        ->with('admin')
        ->with('supermarket')
        ->get();
    }
}
