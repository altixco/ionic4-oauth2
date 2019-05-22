import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor (public authService: AuthService) {}

  ionViewDidEnter() {
    this.authService.test().subscribe((data) => {
      console.log('Home', data);
    })
  }
}
