<?php

namespace App\Http\Controllers;

use App\Models\Outreach;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outreach $outreach)
    {
        //
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
}
