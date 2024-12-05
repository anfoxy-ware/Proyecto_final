import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareasPendientes: any[] = [];
  tareasCompletadas: any[] = [];
  mensajeToast: string | null = null;

  constructor(private tareasService: TareasService) {}

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareasService.obtenerTareas().subscribe({
      next: (response) => {
        console.log('Tareas obtenidas:', response);
        this.tareasPendientes = response.filter((tarea: any) => !tarea.completada);
        this.tareasCompletadas = response.filter((tarea: any) => tarea.completada);
      },
      error: (error) => {
        console.error('Error al obtener las tareas:', error);
        this.mensajeToast = 'Error al cargar las tareas.';
      },
    });
  }

  abrirAulaVirtual() {
    window.open('https://soft.uasd.edu.do/UASDVirtualGateway/', '_blank');
  }
}
