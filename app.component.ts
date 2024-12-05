import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Noticias', url: '/noticias', icon: 'newspaper' },
    { title: 'Horarios', url: '/horarios', icon: 'time' },
    { title: 'Preselección', url: '/preseleccion', icon: 'school' },
    { title: 'Deudas', url: '/deuda', icon: 'cash' },
    { title: 'Solicitudes', url: '/solicitudes', icon: 'document' },
    { title: 'Tareas', url: '/tareas', icon: 'checkmark' },
    { title: 'Eventos', url: '/eventos', icon: 'calendar' },
    { title: 'Videos', url: '/videos', icon: 'videocam' },
    { title: 'Acerca de', url: '/acerca', icon: 'information-circle' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' },
  ];
  
  constructor() {}
}
