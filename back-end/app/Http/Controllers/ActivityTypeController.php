<?php

namespace App\Http\Controllers;

use App\Models\ActivityType;
use Illuminate\Http\Request;


class ActivityTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activityTypes = ActivityType::all();
        return response()->json(['activityTypes' => $activityTypes], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:activity_types,name',
        ], [
            'name.required' => 'The field name is required.',
            'name.string' => 'The field name must be a string.',
            'name.max' => 'The name field cannot exceed :max characters.',
            'name.unique' => 'This type of activity already exists.',
        ]);

        $activityType = ActivityType::create($request->all());
        return response()->json(['message' => 'Activity type created successfully', 'activityType' => $activityType], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivityType $activityType)
    {
        return response()->json(['activityType' => $activityType], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:activity_types,name,' . $id,
        ], [
            'name.required' => 'The field name is required.',
            'name.string' => 'The field name must be a string.',
            'name.max' => 'The name field cannot exceed :max characters.',
            'name.unique' => 'This type of activity already exists.',
        ]);

        $activityType = ActivityType::findOrFail($id);
        $activityType->update($request->all());
        return response()->json(['message' => 'Activity type updated successfully', 'activityType' => $activityType], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $activityType = ActivityType::findOrFail($id);
        
        try {
            $activityType->delete();
            return response()->json(['message' => 'Activity type deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the activity type'], 500);
        }
    }
}