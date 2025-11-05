import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  standalone: false,
  styleUrls: ['./standings.page.scss'],
})
export class StandingsPage implements OnInit {
  standings: any[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private sweetAlertService: SweetAlertService
  ) {}

  ionViewDidEnter(): void {
    this.loadStandings();
  }

  ngOnInit(): void {
  }

  loadStandings(): void {
    this.loading = true;
    this.sweetAlertService.loading('Cargando clasificación...');

    this.api.getStandings().subscribe({
      next: (data) => {
        this.standings = data;
        setTimeout(() => {
          this.loading = false;
          this.sweetAlertService.close();
        }, 1000); // simula tiempo de carga del servidor
      },
      error: () => {
        setTimeout(() => {
          this.loading = false;
          this.sweetAlertService.close();
          this.sweetAlertService.error('Error al cargar la clasificación.');
        }, 1000);
      },
    });
  }
}