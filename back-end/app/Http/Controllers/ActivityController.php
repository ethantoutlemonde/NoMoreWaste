<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
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

    public function searchActivities(Request $request) {
        // return $request;
        $search = $request->get('s');
        $type = $request->get('t');

        


        $query = Activity::where('name', 'like', '%'.$search.'%');

        // add to the query if start_datetime is after now
        $query->where('start_datetime', '>', Carbon::now());
    
        // Ajouter le filtre par type seulement si $type est défini
        if (!empty($type)) {
            $query->where('activity_type_id', $type);
        }
        
        // Exécuter la requête et récupérer les résultats
        $activities = $query->get();
        
        // Charger la relation 'activityType' et retourner la réponse JSON
        return response()->json(['activities' => $activities->load('activityType')], 200);
    }

    /**
     * Store a newly created activity in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'required|date|after:start_datetime|after:'.Carbon::now()->addHour(),
            'adress' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => ['nullable','string','regex:/^\d{5}$/'],
            'activity_type_id' => 'required|exists:activity_types,id',
            'creator_id' => 'required|exists:users,id',
        ]);



        $validated['start_datetime'] = Carbon::parse($validated['start_datetime'])->format('d-m-Y H:i');
        $validated['end_datetime'] = Carbon::parse($validated['end_datetime'])->format('d-m-Y H:i');

        // Verify if the user have the good documents accepted to create an activity
        $activity = new Activity($validated);

        if ($user->type != 1) {
            $required_documents = $activity->activityType->requiredDocuments;
            foreach ($required_documents as $document) {
                if (!$user->documents->contains('type_id', $document->id)) {
                    return response()->json(['error' => 'You need to have your '.$document->name.' accepted to create an activity'], 400);
                }
            }
            // if (!$user->documents->contains('type_id', 1) || !$user->documents->contains('type_id', 2)) {
            //     return response()->json(['error' => 'You need to have your ID and criminal record accepted to create an activity'], 400);
            // }
        }
        

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
            'postal_code' => ['nullable','string','regex:/^\d{5}$/'],
            'activity_type_id' => 'required|exists:activity_types,id',
            'creator_id' => 'required|exists:users,id',
        ]);

        $activity->update($validated);

        return response()->json(['activity' => $activity , "success" => "Activity updated successfully"], 200);
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

    public function participate(Activity $activity)
    {
        // if the user is already participating in the activity return an error
        if ($activity->participants->contains(Auth::user())) {
            return response()->json(['message' => 'You are already participating in this activity'], 400);
        }
        $user = Auth::user();
        $activity->participants()->attach($user->id);
        return response()->json(['message' => 'You are now participating in this activity']);
    }

    public function cancelParticipation(Activity $activity)
    {
        $user = Auth::user();
        $activity->participants()->detach($user->id);
        return response()->json(['message' => 'You are no longer participating in this activity']);
    }

    public function deleteParticipation(Activity $activity, Request $request)
    {
        $volunteer = User::find($request->volunteer_id);
        if (!$volunteer) {
            return response()->json(['error' => 'Volunteer not found'], 404);
        }
        $activity->participants()->detach($volunteer);
        return response()->json(['message' => 'The volunteer is no longer participating in the activity']);
    }

    public function addParticipant(Activity $activity, Request $request)
    {
        $volunteer = User::find($request->volunteer_id);
        if (!$volunteer) {
            return response()->json(['error' => 'Volunteer not found'], 404);
        }
        if ($activity->participants()->where('volunteer_id', $volunteer->id)->exists()) {
            return response()->json(['message' => 'The volunteer is already participating in the activity'], 400);
        }
        $activity->participants()->attach($volunteer->id);
        return response()->json(['message' => 'The volunteer is now participating in the activity']);
    }

    public function participants(Activity $activity)
    {
        return response()->json(['participants' => $activity->participants], 200);
    }
}
