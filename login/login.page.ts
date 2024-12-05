import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../services/user.service'; // Importamos el servicio

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  username: string | undefined;
  password: string | undefined;

  constructor( private http: HttpClient, private router: Router,
    private storage: Storage,
    private userService: UserService  // Inyectamos el servicio
  ) {
    this.storage.create();  // Inicializamos el almacenamiento local
  }

  // Método para iniciar sesión
  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    console.log('Datos de login enviados:', loginData);  // Verifica los datos en la consola

    // Realizamos la solicitud POST al servidor para autenticar al usuario
    this.http.post<any>('https://uasdapi.ia3x.com/login', loginData, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      }
    }).subscribe(
      async (response) => {
        console.log('Respuesta del servidor:', response);  // Verifica la respuesta del servidor

        // Verificamos si la respuesta tiene el token
        if (response && response.data && response.data.authToken) {
          const authToken = response.data.authToken;  // Guardamos el token recibido
          console.log('Token recibido:', authToken);

          // Guardamos el token en almacenamiento local
          await this.storage.set('authToken', authToken);

          // Ahora podemos llamar al servicio UserService para obtener el perfil del usuario
          this.userService.getUserProfile().subscribe(
            (profile) => {
              console.log('Perfil del usuario:', profile);
              // Redirigimos a la página principal
              this.router.navigateByUrl('/noticias');
            },
            (error) => {
              console.error('Error al obtener el perfil del usuario:', error);
            }
          );
        } else {
          console.error('Error: No se recibió un token.');
          alert('Error de autenticación: usuario o contraseña incorrectos.');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Error en la solicitud de inicio de sesión. Por favor, intente nuevamente.');
      }
    );
  }

  // Método para navegar a la página de recuperación de contraseña
  navigateToRecoverPassword() {
    this.router.navigateByUrl('/recover-password');
  }

  Gotologin(){
    this.router.navigateByUrl('/home')
  }
}
