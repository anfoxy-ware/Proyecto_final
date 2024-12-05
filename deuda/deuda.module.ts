import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudaPageRoutingModule } from './deuda-routing.module';

import { DeudaPage } from './deuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeudaPageRoutingModule
  ],
  declarations: [DeudaPage]
})
export class DeudaPageModule {}
