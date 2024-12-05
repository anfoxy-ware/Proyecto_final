import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = 'https://uasdapi.ia3x.com/info_usuario'; // La URL de la API

  constructor(private http: HttpClient) {}

  // Método para hacer la consulta con el token
  getInfoUsuario(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
