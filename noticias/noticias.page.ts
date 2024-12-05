import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service'; // Importa el servicio de noticias

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias: any[] = [];  // Array para almacenar las noticias
  loading: boolean = true; // Variable para mostrar el estado de carga
  error: string | null = null; // Variable para manejar errores

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.loadNoticias();  // Cargar las noticias cuando se inicialice la página
  }

  // Función para obtener las noticias del servicio
  loadNoticias() {
    this.noticiasService.getNoticias().subscribe(
      (response) => {
        console.log('Noticias obtenidas:', response);
        if (response && response.success && response.data) {
          this.noticias = response.data; // Suponiendo que las noticias están en response.data
        } else {
          this.error = 'No se encontraron noticias disponibles.';
        }
        this.loading = false;  // Cambiar el estado de carga
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
        this.error = 'No se pudieron obtener las noticias. Intente nuevamente más tarde.'; // Manejo de errores
        this.loading = false;  // Cambiar el estado de carga aunque haya error
      }
    );
  }
}
