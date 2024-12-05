import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router'; // Importamos Router para redirecciones
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router // Inyectamos el router
  ) {
    // Crear base de datos local
    this.storage.create().then(() => {
      console.log('Base de datos creada correctamente.');
    }).catch(err => {
      console.error('Error al crear la base de datos', err);
    });
  }

  // Obtener el perfil del usuario
  getUserProfile(): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          return this.http.get<any>('https://uasdapi.ia3x.com/info_usuario', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          throw new Error('No se ha encontrado el token de autenticación');
        }
      })
    );
  }

  // Crear usuario y loguearlo automáticamente
  createUser(userData: any): Observable<any> {
    const apiUrl = 'https://uasdapi.ia3x.com/crear_usuario';
    return this.http.post<any>(apiUrl, userData).pipe(
      tap(async(response) => {
        console.log('Usuario creado:', response);
        this.router.navigate(['/login']);
      }),
    );
  }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    const apiUrl = 'https://uasdapi.ia3x.com/login'; // Endpoint de login
    return this.http.post<any>(apiUrl, { username, password }).pipe(
      tap(async (response) => {
        if (response && response.token) {
          // Guardar el token en el almacenamiento local
          await this.storage.set('authToken', response.token);
          console.log('Token guardado:', response.token);
          // Redirigir al usuario a la página de noticias
          this.router.navigate(['/noticias']);
        } else {
          console.error('Error: No se recibió un token en la respuesta.');
        }
      })
    );
  }
}
