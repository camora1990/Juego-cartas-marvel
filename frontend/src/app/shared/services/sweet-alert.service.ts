import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {

  private background: string = "#1e1e1e"
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
      background: this.background,
    });
  }

  errorMessage() {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>',
      background: this.background,
    });
  }
}
