import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-preseleccion',
  templateUrl: './preseleccion.page.html',
  styleUrls: ['./preseleccion.page.scss'],
})
export class PreseleccionPage implements OnInit {
  materias: any[] = [];
  toastMessage: string | undefined;

  constructor(
    private materiasService: MateriasService,
    private cdr: ChangeDetectorRef, // Servicio para detección de cambios
    private storage: Storage // Almacenamiento local
  ) {
    this.storage.create(); // Inicializamos el almacenamiento
  }

  async ngOnInit() {
    // Intentamos cargar materias desde almacenamiento local primero
    await this.cargarMateriasDesdeAlmacenamiento();
    // Luego intentamos cargar desde la API
    this.obtenerMateriasDisponibles();
  }

  // Método para obtener la lista de materias disponibles desde la API
  obtenerMateriasDisponibles() {
    this.materiasService.obtenerMateriasDisponibles().subscribe({
      next: (materias) => {
        console.log('Materias obtenidas:', materias);
        this.materias = materias || [];
        this.guardarMateriasEnAlmacenamiento(); // Guardamos las materias localmente
        this.detectarCambios(); // Forzamos la actualización de la vista
      },
      error: (error) => {
        console.error('Error al obtener las materias disponibles:', error);
        this.toastMessage = 'Ocurrió un error al cargar las materias.';
      },
    });
  }

  // Método para preseleccionar una materia
  preseleccionarMateria(codigoMateria: string) {
    this.materiasService.preseleccionarMateria(codigoMateria).subscribe({
      next: (response) => {
        console.log('Respuesta de preselección:', response);
        if (response.success) {
          this.toastMessage = 'Materia preseleccionada exitosamente.';
        } else {
          this.toastMessage = response.message || 'Error al preseleccionar materia.';
        }
      },
      error: (error) => {
        console.error('Error al preseleccionar materia:', error);
        this.toastMessage = 'Ocurrió un error al preseleccionar la materia.';
      },
    });
  }

  // Método para guardar materias en el almacenamiento local
  private async guardarMateriasEnAlmacenamiento() {
    await this.storage.set('materias', this.materias);
    console.log('Materias guardadas en almacenamiento local:', this.materias);
  }

  // Método para cargar materias desde almacenamiento local
  private async cargarMateriasDesdeAlmacenamiento() {
    const materiasGuardadas = await this.storage.get('materias');
    if (materiasGuardadas) {
      console.log('Materias cargadas desde almacenamiento local:', materiasGuardadas);
      this.materias = materiasGuardadas;
      this.detectarCambios(); // Forzamos la actualización de la vista
    }
  }

  // Método para forzar la detección de cambios
  private detectarCambios() {
    this.cdr.detectChanges();
  }
}
