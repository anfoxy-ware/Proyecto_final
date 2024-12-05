import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';  // Usamos Ionic Storage para guardar el token

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {
  constructor(private router: Router, private storage: Storage) {}

  // Método para cerrar sesión
  async logout() {
    // Limpiamos el token de almacenamiento
    await this.storage.remove('token');
    
    // Redirigimos a la página de login
    this.router.navigate(['/home']);
  }
}
