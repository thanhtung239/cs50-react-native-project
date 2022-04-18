<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::get();
        return response()->json([
            'data' => $notes,
        ]);
    }

    public function store(Request $request)
    {
        Review::create([
            'title' => $request['title'],
            'content' => $request['content']
        ]);
        return back();
    }

    public function delete($id)
    {
        Note::findOrFail($id)->delete();
        return back();
    }

    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);
        if ($request['title'] == null) {
            $request['title'] = $note->title;
        }
        if ($request['content'] == null) {
            $request['content'] = $note->content;
        }

        $note->update([
            'title' => $request['title'],
            'content' => $request['content'],
        ]);
        $note->save();

        return back();
    }
}
