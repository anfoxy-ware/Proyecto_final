import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient, private storage: Storage) {}

  obtenerVideos(): Observable<any> {
    return from(this.storage.get('authToken')).pipe(
      switchMap((token) => {
        if (token) {
          return this.http.get<any>('https://uasdapi.ia3x.com/videos', {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
      })
    );
  }
}