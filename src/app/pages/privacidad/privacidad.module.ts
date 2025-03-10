import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrivacidadPageRoutingModule } from './privacidad-routing.module';

// No necesitas declarar `PrivacidadPage` aquí ya que es un componente standalone

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // Asegúrate de que IonicModule está aquí
    PrivacidadPageRoutingModule
  ]
})
export class PrivacidadPageModule {}
