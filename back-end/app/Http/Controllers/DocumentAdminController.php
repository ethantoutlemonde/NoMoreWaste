<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentAdminController extends Controller
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
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $documentAdmin)
    {
        return Storage::download($documentAdmin->path);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $documentAdmin)
    {
        $validator = Validator::make($request->all(), [
            'status' => ['required', 'string', 'in:pending,approved,rejected']
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }



        $documentAdmin->update($request->all());

        $documentAdmin->user->checkAndApprovePartner();

        return response()->json(['success' => 'Document updated succesfully'], 200);;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $documentAdmin)
    {
        //
    }
}
