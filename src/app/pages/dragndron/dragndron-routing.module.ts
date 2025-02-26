import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragndronPage } from './dragndron.page'; // Asegúrate de que esté correctamente importado

const routes: Routes = [
  {
    path: '',
    component: DragndronPage // Componente para esta ruta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], // Exportar para usar en el módulo correspondiente
})
export class DragndronPageRoutingModule {}
