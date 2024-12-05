import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../services/horarios.service';
import { Router } from '@angular/router';  // Importamos Router para redirigir al mapa

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  horarios: any[] = [];

  constructor(
    private horariosService: HorariosService,
    private router: Router  // Inyectamos Router
  ) {}

  ngOnInit() {
    this.cargarHorarios();
  }

  // Función para cargar los horarios desde el servicio
  async cargarHorarios() {
    try {
      const horariosObservable = await this.horariosService.getHorarios();
      horariosObservable.subscribe(
        (data) => {
          console.log('Horarios obtenidos:', data);
          this.horarios = data;  // Almacenamos los horarios en una variable
        },
        (error) => {
          console.error('Error al obtener los horarios:', error);
          alert('No se pudieron cargar los horarios. Por favor, intente de nuevo.');
        }
      );
    } catch (err) {
      console.error('Error al recuperar los horarios:', err);
      alert('Hubo un problema con la autenticación. Por favor, inicie sesión nuevamente.');
    }
  }

  // Función para redirigir al mapa con los parámetros de ubicación y materia
  verEnMapa(ubicacion: string, materia: string, aula: string) {
    const [latitude, longitude] = ubicacion.split(',').map(coord => parseFloat(coord.trim()));  // Convertimos la ubicación en un array de coordenadas
    this.router.navigate(['/mapa'], {
      queryParams: {
        latitude: latitude,
        longitude: longitude,
        name: materia,
        surname: aula,  // Descripción adicional (aula en este caso)
      },
    });
  }
}
