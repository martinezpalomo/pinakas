import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DragndronPage } from './pages/dragndron/dragndron.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'dragndron',
    pathMatch: 'full'
  },
  // {
  //   path: 'dragndron',
  //   loadChildren: () => import('./pages/dragndron/dragndron.module').then( m => m.DragndronPageModule)
  // },
  {
    path: 'dragndron',
    component: DragndronPage,  // Ya no es necesario agregar a un NgModule
  },
  {
    path: 'soporte',
    loadChildren: () => import('./pages/soporte/soporte.module').then( m => m.SoportePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
