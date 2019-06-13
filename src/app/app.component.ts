import { Component } from '@angular/core';

import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private authService: AuthService,
    private dialogService: DialogService,
    private events: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.events.subscribe('user:logout', (message) => {
        this.logout(message);
      });
    });
  }

  // When logout button from sidebar is pressed
  logout(message?) {
    this.authService.logout()
    .subscribe(
      () => {
        this.dialogService.presentToast(message || 'Sesión cerrada correctamente');
        this.navCtrl.navigateRoot(`/${environment.NOT_LOGGED_IN_DEFAULT_PATH}`);
      },
      error => {
        console.log(error);
        this.navCtrl.navigateRoot(`/${environment.NOT_LOGGED_IN_DEFAULT_PATH}`);
      }
    );
  }
}
