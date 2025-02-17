<?php

namespace App\Http\Controllers;

use App\Models\FoodCollection;
use App\Models\SupermarketDisponibility;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FoodCollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FoodCollection::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after_or_equal:today|unique:food_collections',
            'start_time' => ['required', 'date_format:H:i', 'after:08:00', 'before:20:00']
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

        $supermarkets = SupermarketDisponibility::where('date', $request->date)
        ->whereHas('supermarket', function ($query) {
            $query->where('banned', false); // Supposons que 'banned' est un booléen
        })
        ->pluck('supermarket_id')
        ->toArray(); // Récupérer seulement les IDs des supermarchés

        // Créer la nouvelle FoodCollection
        $foodCollection = FoodCollection::create([
            'date' => $request->date,
            'start_time' => $request->start_time
        ]);

        // Associer les supermarchés disponibles à la FoodCollection via la table pivot
        if (!empty($supermarkets)) {
            $foodCollection->supermarkets()->attach($supermarkets);
        } else {
            $foodCollection->delete();
            return response()->json(['error' => [
                'after' => 'There isn\'t any supermarket available for this date'
            ]], 400);
        }

        // FoodCollection::create([
        //     'date' => $request->date
        // ]);
        return response()->json(['success' => 'Food Collection succesfully created' ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(FoodCollection $foodCollection)
    {
        // return the food collection with his supermarkets and participants
        return $foodCollection->load('supermarkets', 'participants');



        // return $foodCollection->with('supermarkets','participants')->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FoodCollection $foodCollection)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after_or_equal:today|unique:food_collections' . ($foodCollection->date == $request->date ? ',' . $foodCollection->id : ''),
            'start_time' => ['required', 'date_format:H:i', 'after:08:00', 'before:20:00']
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

        $foodCollection->update($request->all());
        return response()->json(['success' => 'Food Collection succesfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FoodCollection $foodCollection)
    {
        $foodCollection->delete();
        return response()->json(['success' => 'Food Collection succesfully deleted'], 200);
    }

    public function participate(FoodCollection $foodCollection)
    {
        if ($foodCollection->participants()->where('volunteer_id', Auth::user()->id)->exists()) {
            return response()->json(['message' => 'You are already participating to the food collection.'], 400);
        }
        $foodCollection->participants()->attach(Auth::user()->id);
        return response()->json(['message' => 'You are now participating to the food collection.']);
    }

    public function cancelParticipation(FoodCollection $foodCollection)
    {
        $foodCollection->participants()->detach(Auth::user()->id);
        return response()->json(['message' => 'You are no longer participating to the food collection.']);
    }

    public function deleteParticipation(FoodCollection $foodCollection, Request $request)
    {
        $volunteer = User::find($request->volunteer_id);
        if (!$volunteer) {
            return response()->json(['error' => 'Volunteer not found'], 404);
        }
        $foodCollection->participants()->detach($volunteer);
        return response()->json(['message' => 'The volunteer is no longer participating to the food collection.']);
    }

    public function addParticipant(FoodCollection $foodCollection, Request $request)
    {
        $volunteer = User::find($request->volunteer_id);
        if (!$volunteer) {
            return response()->json(['error' => 'Volunteer not found'], 404);
        }
        if ($foodCollection->participants()->where('volunteer_id', $volunteer->id)->exists()) {
            return response()->json(['message' => 'You are already participating to the food collection.'], 400);
        }
        $foodCollection->participants()->attach($volunteer);
        return response()->json(['message' => 'The volunteer is now participating to the food collection.']);
    }
        
}
