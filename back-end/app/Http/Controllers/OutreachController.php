<?php

namespace App\Http\Controllers;

use App\Models\Outreach;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OutreachController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Outreach::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after_or_equal:today|unique:food_collections',
            'start_time' => ['required', 'date_format:H:i', 'after:08:00', 'before:20:00'],
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'postal_code' => ['required', 'string', 'regex:/^\d{5}$/']
        ]
        );

        // date is today but the time is less than the current time return error
        if ($request->date == date('Y-m-d') && $request->start_time < date('H:i')) {
            return response()->json(['error' => [
                'start_time' => 'The start time must be greater than the current time'
            ]], 400);
        }

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        // Créer la nouvelle FoodCollection
        $outreach = Outreach::create([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'address' => $request->address,
            'city' =>$request->city,
            'country' => $request->country,
            'postal_code' => $request->postal_code

        ]);

        return response()->json(['success' => 'Outreach succesfully created' ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Outreach $outreach)
    {
        return $outreach->load('participants');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Outreach $outreach)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after_or_equal:today|unique:food_collections' . ($outreach->date == $request->date ? ',' . $outreach->id : ''),
            'start_time' => ['required', 'date_format:H:i', 'after:08:00', 'before:20:00'],
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'postal_code' => ['required', 'string', 'regex:/^\d{5}$/']
        ]
        );

        if ($request->date == date('Y-m-d') && $request->start_time < date('H:i')) {
            return response()->json(['error' => [
                'start_time' => 'The start time must be greater than the current time'
            ]], 400);
        }

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        $outreach->update($request->all());
        return response()->json(['success' => 'Outreach succesfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outreach $outreach)
    {
        $outreach->delete();
        return response()->json(['success' => 'Outreach succesfully deleted'], 200);
    }

    public function participate(Outreach $outreach)
    {
        if ($outreach->participants()->where('volunteer_id', Auth::user()->id)->exists()) {
            return response()->json(['message' => 'You are already participating to the Outreach.'], 400);
        }
        $outreach->participants()->attach(Auth::user()->id);
        return response()->json(['message' => 'You are now participating to the Outreach.']);
    }

    public function cancelParticipation(Outreach $outreach)
    {
        $outreach->participants()->detach(Auth::user()->id);
        return response()->json(['message' => 'You are no longer participating to the Outreach.']);
    }

    public function deleteParticipation(Outreach $outreach, Request $request)
    {
        $volunteer = User::find($request->volunteer_id);
        if (!$volunteer) {
            return response()->json(['error' => 'Volunteer not found'], 404);
        }
        $outreach->participants()->detach($volunteer);
        return response()->json(['message' => 'The volunteer is no longer participating to the Outreach.']);
    }

    public function addParticipant(Outreach $outreach, Request $request)
    {
        $volunteer = User::find($request->volunteer_id);
        if (!$volunteer) {
            return response()->json(['error' => 'Volunteer not found'], 404);
        }
        if ($outreach->participants()->where('volunteer_id', $volunteer->id)->exists()) {
            return response()->json(['message' => 'You are already participating to the Outreach.'], 400);
        }
        $outreach->participants()->attach($volunteer);
        return response()->json(['message' => 'The volunteer is now participating to the Outreach.']);
    }

    public function addProduct(Outreach $outreach, Request $request)
    {
        // return $request;
        // validate the data
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::find($request->product_id);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        // if the quantity is greater than the available quantity return an error
        if ($request->quantity > $product->quantity) {
            return response()->json(['error' => 'The quantity is greater than the available quantity.'], 400);
        }

        $product->quantity -= $request->quantity;
        $product->save();

        // if the product is already in the outreach dont add a new line but update the quantity by adding the new quantity
        if ($outreach->products()->where('product_id', $request->product_id)->exists()) {
            $currentQuantity = $outreach->products()->where('product_id', $request->product_id)->first()->pivot->quantity;
            // return $currentQuantity;
            // Ajouter la nouvelle quantité
            $newQuantity = $currentQuantity + $request->quantity;
        
            // Mettre à jour la quantité dans la table pivot
            $outreach->products()->updateExistingPivot($request->product_id, ['quantity' => $newQuantity]);
            return response()->json(['message' => 'The product quantity has been updated in the Outreach.']);
        }

        // remove the quantity from the product
        
        


        $outreach->products()->attach($request->product_id, ['quantity' => $request->quantity]);
        return response()->json(['message' => 'The product has been added to the Outreach.']);
    }

    public function getProducts(Outreach $outreach)
    {
        return $outreach->products->load('productType');
    }
}
