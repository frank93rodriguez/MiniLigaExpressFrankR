import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'info'
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'Aceptar'
    });
  }


  success(message: string) {
    return this.showAlert('Éxito', message, 'success');
  }


  error(message: string) {
    return this.showAlert('Error', message, 'error');
  }


  warning(message: string) {
    return this.showAlert('Advertencia', message, 'warning');
  }


  loading(message: string = 'Procesando...') {
    Swal.fire({
      html: `
        <div class="flex flex-col items-center justify-center min-h-[160px]">
          <p class="text-lg font-semibold text-gray-700">${message}</p>
        </div>
      `,
      width: '22rem',
      padding: '1.5rem',
      showConfirmButton: false,
      allowOutsideClick: false,
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: `
        rgba(0,0,0,0.4)
        left top
        no-repeat
      `,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }


  close() {
    Swal.close();
  }


  confirm(
    title: string,
    text: string,
    confirmText: string = 'Sí',
    cancelText: string = 'No'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#dc2626',
    }).then(result => result.isConfirmed);
  }
}
