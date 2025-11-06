<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;

class StandingsController extends Controller
{
    /**
     * Devuelve la tabla de posiciones.
     */
    public function index()
    {
        $teams = Team::all()->map(function ($team) {
            $stats = $team->getStatsAttribute();
            return array_merge($team->toArray(), $stats);
        });

        $sorted = $teams->sortByDesc('points')
                        ->sortByDesc('goal_diff')
                        ->sortByDesc('goals_for')
                        ->values();

        return response()->json($sorted);
    }
}
