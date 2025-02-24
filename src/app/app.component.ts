import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonicModule } from '@ionic/angular';  // Add this import

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule],  // Include IonicModule here for standalone component
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.showSplash();
  }

  async showSplash() {
    await SplashScreen.show({
      autoHide: false,
      showDuration: 3000,
    });

    setTimeout(async () => {
      await SplashScreen.hide();
    }, 2000);
  }
}
