<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MatchGame;

class MatchController extends Controller
{

    /**
     * Registra el resultado de un partido.
     */
    public function result($id, Request $request)
    {
        $data = $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
        ]);

        $match = MatchGame::findOrFail($id);
        $match->update($data);

        return response()->json([
            'message' => 'Resultado actualizado correctamente.',
            'match' => $match
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matches = MatchGame::with(['homeTeam', 'awayTeam'])
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($match) {
                return [
                    'id' => $match->id,
                    'home_team' => $match->homeTeam->name ?? null,
                    'away_team' => $match->awayTeam->name ?? null,
                    'home_score' => $match->home_score,
                    'away_score' => $match->away_score,
                    'played' => $match->isPlayed(),
                    'winner' => $match->winner()?->name,
                    'loser' => $match->loser()?->name,
                    'draw' => $match->isDraw(),
                    'summary' => $match->summary(),
                ];
            });

        return response()->json($matches);
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
