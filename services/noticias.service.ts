import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';  // Importamos switchMap

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  // Método para obtener noticias
  getNoticias(): Observable<any> {
    return from(this.storage.get('authToken')).pipe(  // Convertimos la Promise en Observable
      switchMap((token) => {  // Usamos switchMap para hacer la llamada HTTP solo cuando tengamos el token
        if (token) {
          return this.http.get<any>('https://uasdapi.ia3x.com/noticias', {
            headers: {
              'Authorization': `Bearer ${token}`  // Usamos el token almacenado en las cabeceras
            }
          });
        } else {
          throw new Error('No se ha encontrado el token de autenticación');
        }
      })
    );
  }
}
