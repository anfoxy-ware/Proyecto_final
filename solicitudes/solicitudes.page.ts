import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../services/solicitudes.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {
  tiposSolicitudes: any[] = [];
  solicitudes: any[] = [];
  misSolicitudes: any[] = []; // Nueva lista para las solicitudes del usuario
  nuevaSolicitud = {
    tipo: '',
    descripcion: '',
  };
  mensajeToast: string | null = null;

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit() {
    this.obtenerTiposSolicitudes();
    this.obtenerSolicitudes();
    this.obtenerMisSolicitudes(); // Llamamos al método para obtener solicitudes del usuario
  }

  obtenerTiposSolicitudes() {
    this.solicitudesService.obtenerTiposSolicitudes().subscribe({
      next: (response) => {
        if (response.success) {
          this.tiposSolicitudes = response.data;
        } else {
          this.mensajeToast = 'Error al cargar los tipos de solicitudes.';
        }
      },
      error: (error) => {
        this.mensajeToast = 'Error al cargar los tipos de solicitudes.';
      },
    });
  }

  crearSolicitud() {
    if (!this.nuevaSolicitud.tipo || !this.nuevaSolicitud.descripcion) {
      this.mensajeToast = 'Por favor, complete todos los campos.';
      return;
    }

    this.solicitudesService
      .crearSolicitud(this.nuevaSolicitud.tipo, this.nuevaSolicitud.descripcion)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.mensajeToast = 'Solicitud creada exitosamente.';
            this.nuevaSolicitud = { tipo: '', descripcion: '' };
            this.obtenerMisSolicitudes(); // Actualizamos la lista de solicitudes del usuario
          } else {
            this.mensajeToast =
              response.message || 'Error al crear la solicitud.';
          }
        },
        error: () => {
          this.mensajeToast = 'Error al crear la solicitud.';
        },
      });
  }

  obtenerSolicitudes() {
    this.solicitudesService.obtenerMisSolicitudes().subscribe({
      next: (response) => {
        if (response.success) {
          this.solicitudes = response.data || [];
        } else {
          this.mensajeToast = 'Error al cargar las solicitudes.';
        }
      },
      error: () => {
        this.mensajeToast = 'Error al cargar las solicitudes.';
      },
    });
  }

  // Nuevo método para obtener las solicitudes del usuario
  obtenerMisSolicitudes() {
    this.solicitudesService.obtenerMisSolicitudes().subscribe({
      next: (response) => {
        if (response.success) {
          this.misSolicitudes = response.data || [];
        } else {
          this.mensajeToast = 'Error al cargar mis solicitudes.';
        }
      },
      error: () => {
        this.mensajeToast = 'Error al cargar mis solicitudes.';
      },
    });
  }
}
