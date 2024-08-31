<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // return the user without the password
        
        return $user->load('documents.type');
        // return User::where('id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json(['success' => 'User succesfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['success' => 'User succesfully deleted'], 200);
    }

    // public function ban(User $user)
    // {
    //     // Logique pour bannir l'utilisateur
    //     // Par exemple, marquer l'utilisateur comme banni dans la base de données
    //     $user->update(['banned' => true]);
    
    //     return response()->json(['message' => 'User banned successfully.']);
    // }
}
