import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page'; // Asegúrate de que HomePage esté correctamente importado

const routes: Routes = [
  {
    path: '',
    component: HomePage, // Componente para la página de inicio
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configura rutas para la carga perezosa
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
