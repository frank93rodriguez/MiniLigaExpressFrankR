<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchGame extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'home_team_id',
        'away_team_id',
        'home_score',
        'away_score',
    ];

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    /**
     * Indica si el partido ya fue jugado (ambos scores registrados)
     */
    public function isPlayed(): bool
    {
        return $this->home_score !== null && $this->away_score !== null;
    }

    /**
     * Retorna el ganador del partido, o null si fue empate o no jugado
     */
    public function winner(): ?Team
    {
        if (!$this->isPlayed()) {
            return null;
        }

        if ($this->home_score > $this->away_score) {
            return $this->homeTeam;
        } elseif ($this->away_score > $this->home_score) {
            return $this->awayTeam;
        }

        return null;
    }

    /**
     * Retorna el perdedor del partido, o null si fue empate o no jugado
     */
    public function loser(): ?Team
    {
        if (!$this->isPlayed()) {
            return null;
        }

        if ($this->home_score < $this->away_score) {
            return $this->homeTeam;
        } elseif ($this->away_score < $this->home_score) {
            return $this->awayTeam;
        }

        return null;
    }

    /**
     * Determina si hubo empate
     */
    public function isDraw(): bool
    {
        return $this->isPlayed() && $this->home_score === $this->away_score;
    }

    /**
     * Devuelve un resumen del partido
     */
    public function summary(): string
    {
        if (!$this->isPlayed()) {
            return "{$this->homeTeam->name} vs {$this->awayTeam->name} (pendiente)";
        }

        return "{$this->homeTeam->name} {$this->home_score} - {$this->away_score} {$this->awayTeam->name}";
    }
    
}
