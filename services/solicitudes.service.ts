import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private baseUrl = 'https://uasdapi.ia3x.com';

  constructor(private http: HttpClient, private storage: Storage) {}

  // Método para obtener los tipos de solicitudes
  obtenerTiposSolicitudes(): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          return this.http.get<any>(`${this.baseUrl}/tipos_solicitudes`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: '*/*',
            },
          });
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
      })
    );
  }

  // Método para crear una nueva solicitud
  crearSolicitud(tipo: string, descripcion: string): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          const payload = {
            tipo,
            descripcion,
          };
          return this.http.post<any>(`${this.baseUrl}/crear_solicitud`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
      })
    );
  }

  // Método para obtener las solicitudes creadas por el usuario
  // solicitudes.service.ts
obtenerMisSolicitudes(): Observable<any> {
  return from(this.storage.get('authToken')).pipe(
    switchMap((token) => {
      if (token) {
        return this.http.get<any>('https://uasdapi.ia3x.com/mis_solicitudes', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        throw new Error('No se encontró el token de autenticación');
      }
    })
  );
}

}
