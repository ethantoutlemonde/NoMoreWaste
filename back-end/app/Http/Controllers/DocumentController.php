<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
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
        $request->merge(['type' => (int) $request->type]);
        // return $request;
        $user = Auth::user();
        
        $validator = Validator::make($request->all(), [
            // 'user_id' => ['required', 'integer', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:2048'],
            'type' => ['required', 'exists:document_types,id', 'unique:documents,type_id,NULL,id,user_id,' . $user->id ]
        ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->messages()], 400);
        }

        // $existingDocument = Document::where('user_id', $user->id)
        //                         ->where('type_id', $request->type)
        //                         ->first();

        // return $existingDocument;

        // if ($existingDocument) {
        //     return response()->json(['error' => 'You already have a document of this type'], 400);
        // }

        $path = $request->file('file')->store('documents');

        Document::create([
            'user_id' => $user->id,
            'path' => $path,
            'type_id' => $request->type,
            'status' => 'pending'
        ]);

        return response()->json(['success' => 'Document uploaded succesfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return Storage::download($document->path);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
