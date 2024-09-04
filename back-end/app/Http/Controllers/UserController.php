<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => ['required','regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/'],
            'password' => 'nullable|string|min:8',
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }
        
        $user->update($request->all());

        return response()->json(['success' => 'Volunteer succesfully updated'], 200);
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
