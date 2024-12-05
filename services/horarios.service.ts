import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = 'https://uasdapi.ia3x.com';

  constructor(private http: HttpClient, private storage: Storage) {}

  async getHorarios(): Promise<Observable<any>> {
    const token = await this.storage.get('authToken'); // Recupera el token desde el almacenamiento
    const headers = new HttpHeaders({
      'Authorization': token, // Incluye el token como encabezado
      'accept': '*/*',
    });

    return this.http.get(`${this.baseUrl}/horarios`, { headers });
  }
}
