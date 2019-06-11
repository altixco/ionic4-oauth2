import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: any, color = "dark") {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
