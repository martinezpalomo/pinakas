import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module'; // Asegúrate de que HomePageRoutingModule esté bien importado

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule // Asegúrate de que esté correctamente configurado
  ],
  declarations: [HomePage] // Asegúrate de declarar HomePage aquí
})
export class HomePageModule {}
