import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';  // Para manejar el token

@Injectable({
  providedIn: 'root',
})
export class DeudaService {
  constructor(private http: HttpClient, private storage: Storage) {}

  // Método para obtener las deudas del usuario
  obtenerDeudas(): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          return this.http.get<any>('https://uasdapi.ia3x.com/deudas', {
            headers: {
              Authorization: `Bearer ${token}`,  // Incluimos el token en los headers
            },
          });
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
      })
    );
  }
}
