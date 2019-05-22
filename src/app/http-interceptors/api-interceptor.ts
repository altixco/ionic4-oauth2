import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Prepend the server url
    const cloneOptions = {
      url: `${environment.SERVER_URL}${req.url}`
    };

    if (this.auth.isLoggedIn()) {
      // Get the auth token from the service.
      cloneOptions['setHeaders'] = {
        'Authorization': this.auth.getAuthorizationHeader()
      };
    }
    // Clone the request, prepend the server url and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone(cloneOptions);

    // send cloned request with updates to the next handler.
    return next.handle(authReq);
  }
}
