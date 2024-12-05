import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Importamos el servicio
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  // Variables que almacenarán los datos del formulario
  nombre: string = '';
  apellido: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  authToken: string = '';

  constructor(private userService: UserService, private router: Router,
  ) {}

  // Método para manejar el envío del formulario
  registerUser() {
    const userData = {
      id: 0,  // Este es solo un valor placeholder, se manejará desde el backend
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      password: this.password,
      email: this.email,
      authToken: this.authToken
    };

    // Llamada al servicio para crear el usuario
    this.userService.createUser(userData).subscribe(
      response => {
        console.log('Usuario creado exitosamente', response);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error => {
        console.error('Error al crear usuario', error);
        // Manejo de errores
      }
    );
  }
  goBack(){
    this.router.navigateByUrl('/home')
  }
}
