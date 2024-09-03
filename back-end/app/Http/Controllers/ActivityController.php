<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    /**
     * Display a listing of the activities.
     */
    public function index()
    {
        $activities = Activity::with('activityType', 'creator')->get();
        return response()->json(['activities' => $activities], 200);
    }

    /**
     * Store a newly created activity in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'required|date|after:start_datetime|after:'.Carbon::now()->addHour(),
            'adress' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'activity_type_id' => 'required|exists:activity_types,id',
            'creator_id' => 'required|exists:users,id',
        ]);

        $validated['start_datetime'] = Carbon::parse($validated['start_datetime'])->format('d-m-Y H:i');
        $validated['end_datetime'] = Carbon::parse($validated['end_datetime'])->format('d-m-Y H:i');

        $activity = Activity::create($validated);

        return response()->json(['activity' => $activity, 'success' => 'Activity succesfully created'], 201);
    }

    /**
     * Display the specified activity.
     */
    public function show(Activity $activity)
    {
        return response()->json(['activity' => $activity -> load("creator")], 200);
    }

    /**
     * Update the specified activity in storage.
     */
    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'required|date|after:start_datetime|after:'.Carbon::now()->addHour(),
            'adress' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'activity_type_id' => 'required|exists:activity_types,id',
            'creator_id' => 'required|exists:users,id',
        ]);

        $activity->update($validated);

        return response()->json(['activity' => $activity]);
    }

    /**
     * Remove the specified activity from storage.
     */
    public function destroy($id)
    {
        try {
            $activity = Activity::findOrFail($id);
            $activity->delete();
            return response()->json(['message' => 'Activity deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Activity not found'], 404);
        }
    }

    public function myActivities(Request $request)
    {
        $user = Auth::user();
        return Activity::where('creator_id', $user->id)->with('activityType')->get();
    }
}
