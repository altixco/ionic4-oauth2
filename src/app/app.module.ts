import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { httpInterceptorProviders } from './http-interceptors/index'
import { AuthService } from './services/auth.service';


export function authServiceFactory(authService: AuthService) {
  return () => authService.loadTokenData();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    httpInterceptorProviders,
    AuthService,
    // Load authServiceFactory before the app init (To load the token, etc)
    { provide: APP_INITIALIZER, useFactory: authServiceFactory, deps: [AuthService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
