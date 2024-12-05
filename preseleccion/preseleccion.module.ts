import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreseleccionPageRoutingModule } from './preseleccion-routing.module';

import { PreseleccionPage } from './preseleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreseleccionPageRoutingModule
  ],
  declarations: [PreseleccionPage]
})
export class PreseleccionPageModule {}
