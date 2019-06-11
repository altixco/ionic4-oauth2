import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private dialogService: DialogService
  ) { }

  ngOnInit() {}

  // Dismiss Login Modal
  dismissLogin(toRegister = false) {
    this.modalController.dismiss({ toRegister });
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.dialogService.presentToast('Sesión Iniciada Correctamente');
        this.dismissLogin();
        this.navCtrl.navigateRoot(`/${environment.LOGGED_IN_DEFAULT_PATH}`);
      },
      error => {
        this.dialogService.presentToast('El usuario o la contraseña es incorrecta', 'danger');
      }
    );
  }

}
