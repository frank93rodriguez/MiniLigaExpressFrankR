import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})

export class TeamsComponent implements OnInit {
  form!: FormGroup;
  teams: any[] = [];
  loading = false;

  constructor(private fb: FormBuilder, private api: ApiService, private sweetAlertService: SweetAlertService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
    this.loadTeams();
  }

  loadTeams(): void {
    this.loading = true;
    this.api.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  addTeam(): void {
    if (this.form.invalid) return;
    this.sweetAlertService.loading('Agregando equipo...');
    this.api.createTeam(this.form.value).subscribe({
      next: (response) => {
        this.sweetAlertService.close();
        this.sweetAlertService.success(
          'El equipo se agregó correctamente.'
        );
        this.form.reset();
        this.loadTeams();
      },
      error: (err) => {
        this.sweetAlertService.close();
        const msg =
          err?.error?.message ||
          'No se pudo agregar el equipo. Intenta nuevamente.';
        this.sweetAlertService.error('Error');
      },
    });
  }
}