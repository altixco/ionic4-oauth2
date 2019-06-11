import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  public newUser = {
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    client: {
      addres: "",
      phone_number: ""
    }
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  dismissRegister(toLogin = false) {
    this.modalController.dismiss({ toLogin });
  }

  register(form: NgForm) {
    this.authService.register(this.newUser).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
            this.dismissRegister();
            this.navCtrl.navigateRoot(`/${environment.LOGGED_IN_DEFAULT_PATH}`);
          },
          error => {
            this.dismissRegister();
            console.log(error);
          }
        );
        this.dialogService.presentToast('Registro realizado con éxito');
      },
      error => {
        this.dialogService.presentToast('Algo salió mal, no se pudo completar el registro', 'danger');
        console.log(error);
      },
    );
  }
}
