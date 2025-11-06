import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api-service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UpdateMatchComponent } from './update-match/update-match.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  standalone: false,
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  matches: any[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private sweetAlertService: SweetAlertService,
    private modalCtrl: ModalController
  ) {}

  ionViewDidEnter(): void {
    this.loadMatches();
  }

  ngOnInit() {
  }

  loadMatches(): void {
    this.loading = true;
    this.sweetAlertService.loading('Cargando partidos...');

    this.api.getMatches().subscribe({
      next: (data) => {
        console.info("getMatches: ", data);
        this.matches = data;
        setTimeout(() => {
          this.loading = false;
          this.sweetAlertService.close();
        }, 1000);
      },
      error: () => {
        setTimeout(() => {
          this.loading = false;
          this.sweetAlertService.close();
          this.sweetAlertService.error('Error al cargar los partidos.');
        }, 1000);
      },
    });
  }

  async openMatchModal(match: any, event: Event) {
    event.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: UpdateMatchComponent,
      componentProps: { match }
    });
    modal.onDidDismiss().then((result) => {
      if (result?.data?.updated) {
        this.loadMatches();
      }
    });
    await modal.present();
  }

}
