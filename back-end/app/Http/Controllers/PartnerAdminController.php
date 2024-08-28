<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PartnerAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::where('type', 4)->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => ['required','regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/'],
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'type' => 4,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['success' => 'Partner succesfully created' ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $partnerAdmin)
    {
        // return $user with his supermarkets
        return $partnerAdmin->load('supermarkets','documents.type');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $partnerAdmin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $partnerAdmin)
    {
        //
    }


}
