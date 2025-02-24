import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragndronPage } from './dragndron.page';

const routes: Routes = [
  {
    path: '',
    component: DragndronPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragndronPageRoutingModule {}
