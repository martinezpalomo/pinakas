import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DragndronPage } from './pages/dragndron/dragndron.page'; 

// Define your routes
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
  {
    path: 'dragndron',
    component: DragndronPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // Expose the routes array so it can be used in main.ts
  static routes = routes;
}
