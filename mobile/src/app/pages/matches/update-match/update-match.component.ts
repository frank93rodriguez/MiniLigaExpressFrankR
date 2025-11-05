import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-update-match',
  templateUrl: './update-match.component.html',
  standalone: false,
  styleUrls: ['./update-match.component.scss'],
})
export class UpdateMatchComponent  implements OnInit {
  @Input() match: any;
  form: FormGroup;
  submitting = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private api: ApiService,
    private sweetAlertService: SweetAlertService
  ) {
    this.form = this.fb.group({
      home_score: [null, [Validators.required, Validators.min(0)]],
      away_score: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.form.patchValue({
      home_score: this.match.home_score,
      away_score: this.match.away_score,
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitting = true;
    this.sweetAlertService.loading('Actualizando resultado...');

    const { home_score, away_score } = this.form.value;

    this.api.updateMatchResult(this.match.id, home_score, away_score).subscribe({
      next: () => {
        this.sweetAlertService.close();
        this.submitting = false;
        this.modalCtrl.dismiss({ updated: true });
      },
      error: (err) => {
        console.error(err);
        this.sweetAlertService.close();
        this.submitting = false;
        this.sweetAlertService.error('Error al actualizar el resultado.');
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
