import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: environment.LOGGED_IN_DEFAULT_PATH,
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: environment.NOT_LOGGED_IN_DEFAULT_PATH,
    loadChildren: './pages/landing/landing.module#LandingPageModule'
  },
  // Login and register page are loaded from landing page as modals
  /*
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  */
  // When page is not found
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
