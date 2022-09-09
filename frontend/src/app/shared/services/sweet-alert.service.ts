import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  successfulMessage(
    message: string = 'Your work has been saved',
    timer: number = 1500
  ): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: timer,
      background: '#1e1e1e',
    });
  }
}
