<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    
    protected $table = 'teams';

    protected $fillable = [
        'name',
        'goals_for',
        'goals_against',
    ];

    public function getStatsAttribute()
    {
        $matchesHome = MatchGame::where('home_team_id', $this->id)->get();
        $matchesAway = MatchGame::where('away_team_id', $this->id)->get();

        $played = $wins = $draws = $losses = $goalsFor = $goalsAgainst = 0;

        foreach ([$matchesHome, $matchesAway] as $matches) {
            foreach ($matches as $m) {
                if ($m->home_score === null || $m->away_score === null) continue;

                $played++;
                $isHome = $m->home_team_id === $this->id;
                $goalsFor += $isHome ? $m->home_score : $m->away_score;
                $goalsAgainst += $isHome ? $m->away_score : $m->home_score;

                if ($m->home_score === $m->away_score) $draws++;
                elseif (($isHome && $m->home_score > $m->away_score) ||
                        (!$isHome && $m->away_score > $m->home_score)) $wins++;
                else $losses++;
            }
        }

        return [
            'played' => $played,
            'wins' => $wins,
            'draws' => $draws,
            'losses' => $losses,
            'goals_for' => $goalsFor,
            'goals_against' => $goalsAgainst,
            'goal_diff' => abs($goalsFor - $goalsAgainst),
            'points' => ($wins * 3) + $draws,
        ];
    }
}
