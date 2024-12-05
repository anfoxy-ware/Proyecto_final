import { Component, OnInit } from '@angular/core';
import { DeudaService } from '../services/deuda.service';  // Asegúrate de tener el servicio

@Component({
  selector: 'app-deuda',
  templateUrl: './deuda.page.html',
  styleUrls: ['./deuda.page.scss'],
})
export class DeudaPage implements OnInit {
  deudas: any[] = [];
  toastMessage: string | undefined;

  constructor(private deudaService: DeudaService) {}

  ngOnInit() {
    this.obtenerDeudas();
  }

  // Método para obtener las deudas del estudiante
  obtenerDeudas() {
    this.deudaService.obtenerDeudas().subscribe({
      next: (response) => {
        console.log('Deudas obtenidas:', response);
        if (response && response.length > 0) {
          this.deudas = response;
        } else {
          this.toastMessage = 'No tienes deudas pendientes.';
        }
      },
      error: (error) => {
        console.error('Error al obtener las deudas:', error);
        this.toastMessage = 'Ocurrió un error al cargar las deudas.';
      },
    });
  }

  // Método para redirigir al estudiante a la página de pago
  redirectToPayment() {
    const urlPago = 'https://www.uasd.edu.do/pago';  // Reemplaza con la URL real del pago
    window.open(urlPago, '_blank');  // Abre la página en una nueva pestaña
  }
}
