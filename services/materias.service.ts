import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  constructor(private http: HttpClient, private storage: Storage) {}

  // Obtener materias disponibles
  obtenerMateriasDisponibles(): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          return this.http.get<any>('https://uasdapi.ia3x.com/materias_disponibles', {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
      })
    );
  }

  // Preseleccionar una materia
  preseleccionarMateria(codigoMateria: string): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          return this.http.post<any>(
            'https://uasdapi.ia3x.com/preseleccionar_materia',
            JSON.stringify(codigoMateria), // Solo se envía el código como cadena
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          throw new Error('No se ha encontrado el token de autenticación');
        }
      })
    );
  }
}
