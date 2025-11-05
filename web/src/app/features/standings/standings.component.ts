import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-standings',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss'
})
export class StandingsComponent implements OnInit {
  standings: any[] = [];
  loading = false;

  constructor(private api: ApiService, private sweetAlertService: SweetAlertService) {}

  ngOnInit(): void {
    this.loadStandings();
  }

  loadStandings(): void {
    this.sweetAlertService.loading('Cargando clasificación...');
    this.api.getStandings().subscribe({
      next: (data) => {
        this.standings = data;
        setTimeout(() => {this.sweetAlertService.close();}, 1000);//simula tiempo de carga del servidor
      },
      error: () => {
        setTimeout(() => {
          this.sweetAlertService.close();
          this.sweetAlertService.error('Error al cargar la clasificación.');
        }, 1000);
      },
    });
  }
}