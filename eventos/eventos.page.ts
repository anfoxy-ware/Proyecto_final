import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: any[] = [];
  eventoSeleccionado: any | null = null;

  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventosService.obtenerEventos().subscribe({
      next: (response) => {
        console.log('Eventos obtenidos:', response);
        this.eventos = response;
      },
      error: (error) => {
        console.error('Error al obtener los eventos:', error);
      },
    });
  }

  mostrarDetalles(evento: any) {
    this.eventoSeleccionado = evento;
  }

  cerrarDetalles() {
    this.eventoSeleccionado = null;
  }
}
