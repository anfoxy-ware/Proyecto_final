import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://uasdapi.ia3x.com/crear_usuario';  // URL del API de registro

  constructor(private http: HttpClient) { }

  registerUser(registerData: any, headers: HttpHeaders): Observable<any> {
    return this.http.post(this.apiUrl, registerData, { headers });
  }
}
