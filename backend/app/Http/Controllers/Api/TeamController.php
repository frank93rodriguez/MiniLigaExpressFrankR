<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    /**
     * Devuelve la lista de equipos registrados.
     */
    public function index()
    {
        return response()->json(Team::all());
    }

    /**
     * Registra un nuevo equipo.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:teams,name',
        ]);

        $team = Team::create($data);

        return response()->json($team, 201);
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
