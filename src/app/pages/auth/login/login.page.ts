import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService,
    private navCtrl: NavController,
    private dialogService: DialogService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.authService.loadTokenData();
    if (this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  login(form: NgForm) {
    console.log(form);
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.dialogService.presentToast("Sesión Iniciada Correctamente");
      },
      error => {
        this.dialogService.presentToast("Error al iniciar sesión");
      },
      () => {
        this.navCtrl.navigateRoot('/home');
      }
    );
  }

}
