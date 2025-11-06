<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Team;
use App\Models\MatchGame;

class StandingsTest extends TestCase
{
use RefreshDatabase;

    /** @test */
    public function verifica_calculo_correcto_de_puntos_en_victoria_y_empate()
    {
        // Crear equipos
        $teamA = Team::create(['name' => 'Tigers']);
        $teamB = Team::create(['name' => 'Sharks']);

        // Crear un partido y asignar resultado: victoria de A
        MatchGame::create([
            'home_team_id' => $teamA->id,
            'away_team_id' => $teamB->id,
            'home_score' => 2,
            'away_score' => 1,
        ]);

        // Verificar estadísticas de A y B
        $this->assertEquals(3, $teamA->getStatsAttribute()['points']);
        $this->assertEquals(0, $teamB->getStatsAttribute()['points']);

        // Crear un segundo partido: empate
        MatchGame::create([
            'home_team_id' => $teamA->id,
            'away_team_id' => $teamB->id,
            'home_score' => 1,
            'away_score' => 1,
        ]);

        // Recalcular después del empate
        $teamA->refresh();
        $teamB->refresh();

        $this->assertEquals(4, $teamA->getStatsAttribute()['points']); // 3 + 1
        $this->assertEquals(1, $teamB->getStatsAttribute()['points']); // 0 + 1

        // Crear un tercer partido: empate
        MatchGame::create([
            'home_team_id' => $teamA->id,
            'away_team_id' => $teamB->id,
            'home_score' => 0,
            'away_score' => 2,
        ]);

        // Recalcular
        $teamA->refresh();
        $teamB->refresh();

        $this->assertEquals(4, $teamA->getStatsAttribute()['points']); // 4 + 0
        $this->assertEquals(4, $teamB->getStatsAttribute()['points']); // 1 + 3
    }
}
