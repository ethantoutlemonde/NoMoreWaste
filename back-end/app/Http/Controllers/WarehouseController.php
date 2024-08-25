<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $warehouses = Warehouse::all();
        return response()->json([
            'warehouses' => $warehouses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
/**
 * Store a newly created resource in storage.
 */
public function store(Request $request)
{
    $validatedData = $request->validate([
        'warehouse_name' => 'required|string|max:255',
        'location' => 'required|string|max:255',
    ]);
    $existingWarehouse = Warehouse::where('warehouse_name', $validatedData['warehouse_name'])->first();
    if ($existingWarehouse) {
        return response()->json(['error' => 'Warehouse with this name already exists'], 400);
    }
    $warehouse = new Warehouse();
    $warehouse->warehouse_name = $validatedData['warehouse_name'];
    $warehouse->location = $validatedData['location'];
    $warehouse->save();

    return response()->json([
        'message' => 'Warehouse created successfully',
        'warehouse' => $warehouse
    ], 201);
}


    /**
     * Display the specified resource.
     */
    public function show(Warehouse $warehouse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'warehouse_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);
    
        try {
            $warehouse = Warehouse::findOrFail($id);
            
            // Vérifier si le nom de l'entrepôt est déjà utilisé par un autre entrepôt
            $existingWarehouse = Warehouse::where('warehouse_name', $request->input('warehouse_name'))
                ->where('id', '!=', $id)
                ->first();
    
            if ($existingWarehouse) {
                return response()->json(['error' => 'Warehouse name already exists'], 422);
            }
    
            $warehouse->update([
                'warehouse_name' => $request->input('warehouse_name'),
                'location' => $request->input('location'),
            ]);
    
            return response()->json(['message' => 'Warehouse updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the warehouse'], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $warehouse = Warehouse::findOrFail($id);
            $warehouse->delete();
            return response()->json(['message' => 'Warehouse deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete warehouse', 'message' => $e->getMessage()], 500);
        }
    }
}
