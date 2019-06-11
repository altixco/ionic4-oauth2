import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.authService.loadTokenData();
    if (this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot(`/${environment.LOGGED_IN_DEFAULT_PATH}`);
    }
  }

  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });

    registerModal.onDidDismiss().then((event) => {
      let toLogin = event['data'] && event['data'].toLogin;
      if (toLogin) {
        this.login();
      }
    });

    return await registerModal.present();
  }

  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });

    loginModal.onDidDismiss().then((event) => {
      let toRegister = event['data'] && event['data'].toRegister;
      if (toRegister) {
        this.register();
      }
    });

    return await loginModal.present();
  }

}
