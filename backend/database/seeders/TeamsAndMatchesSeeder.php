<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\MatchGame;

class TeamsAndMatchesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = collect(['Dragons', 'Sharks', 'Tigers', 'Wolves'])
            ->map(function ($name) {
                return Team::create(['name' => $name]);
            });

        MatchGame::create([
            'home_team_id' => $teams[0]->id,
            'away_team_id' => $teams[1]->id,
        ]);

        MatchGame::create([
            'home_team_id' => $teams[2]->id,
            'away_team_id' => $teams[3]->id,
        ]);

        MatchGame::create([
            'home_team_id' => $teams[1]->id,
            'away_team_id' => $teams[3]->id,
        ]);
    }
}
