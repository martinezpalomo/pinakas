import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';  // Standalone component
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapApplication(AppComponent)  // Bootstrapping the standalone AppComponent
  .catch((err: any) => console.log(err));  // Fixing the implicit 'any' type error
