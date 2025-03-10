// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-privacidad',
//   templateUrl: './privacidad.page.html',
//   styleUrls: ['./privacidad.page.scss'],
//   standalone: true, // Define el componente como standalone
// })
// export class PrivacidadPage implements OnInit {
//   constructor() {}

//   ngOnInit() {}
// }


import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
  standalone: true,
  imports: [IonicModule],  // Asegúrate de agregar IonicModule aquí
})
export class PrivacidadPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
