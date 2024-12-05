import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {
  map!: L.Map; // Mapa de Leaflet
  latitude: number = 0; 
  longitude: number = 0; 
  name: string = '';  
  surname: string = '';  

  constructor(private activatedRoute: ActivatedRoute) {}

  ngAfterViewInit() {
    // Damos un pequeño retraso para asegurarnos que el DOM está listo
    setTimeout(() => {
      this.initMap();  
    }, 500);
  }

  initMap() {
    if (this.map) return; // Prevenimos reinicialización

    this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.activatedRoute.queryParams.subscribe(params => {
      // Validamos y asignamos parámetros
      if (params['latitude'] && params['longitude'] && params['name'] && params['surname']) {
        this.latitude = parseFloat(params['latitude']);
        this.longitude = parseFloat(params['longitude']);
        this.name = params['name'];
        this.surname = params['surname'];
      } else {
        console.error('Parámetros insuficientes para cargar el mapa.');
        return;
      }

      // Creamos un marcador o círculo en las coordenadas
      L.circle([this.latitude, this.longitude], {
        radius: 10,
        color: 'red', 
        fillColor: 'red', 
        fillOpacity: 0.8, 
      }).addTo(this.map)
        .bindPopup(`<b>${this.name} ${this.surname}</b><br/>Lat: ${this.latitude}<br/>Long: ${this.longitude}`)
        .openPopup();

      // Ajustamos la vista del mapa a las coordenadas
      this.map.setView([this.latitude, this.longitude], 13);
    });
  }
}
