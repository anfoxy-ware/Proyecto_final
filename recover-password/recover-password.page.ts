import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {

  username: string | undefined;
  email: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Método para recuperar la contraseña
  recoverPassword() {
    const recoveryData = {
      usuario: this.username,
      email: this.email
    };

    this.http.post<any>('https://uasdapi.ia3x.com/reset_password', recoveryData, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      }
    }).subscribe(
      (response) => {
        console.log('Respuesta de recuperación:', response);
        if (response.success) {
          alert('Contraseña cambiada exitosamente');
          this.router.navigateByUrl('/login');
        } else {
          alert('Error al recuperar la contraseña.');
        }
      },
      (error) => {
        console.error('Error al recuperar la contraseña:', error);
        alert('Hubo un error al intentar recuperar la contraseña.');
      }
    );
  }
}
