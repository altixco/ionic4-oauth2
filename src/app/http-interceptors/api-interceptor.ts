import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap, switchMap, filter, take } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Events } from '@ionic/angular';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  // Used to track changes in the refreshToken processes
  private refreshTokenFinishedSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private auth: AuthService, private events: Events) {}

  updateRequest(req: HttpRequest<any>) {
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
    return req.clone(cloneOptions);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // send cloned request with updates to the next handler.
    return next.handle(this.updateRequest(req)).pipe(
      catchError(err => {
        // Status code 401 (Unauthorized) means that the token could be expired
        if (err.status === 401) {
          if (this.refreshTokenInProgress) {
            // The token is being refreshed, waits until we receive confirmation that it's finished
            return this.refreshTokenFinishedSubject.pipe(
              filter(refreshTokenFinished => refreshTokenFinished === true),
              take(1),
              // Retry the newly updated request
              switchMap(() => next.handle(this.updateRequest(req)))
            );
          } else {
            // Refresh the token before retrying the request
            this.refreshTokenInProgress = true;
            // Let's inform other requests that the refreshing is in progress
            this.refreshTokenFinishedSubject.next(false);
            return this.auth.refresh().pipe(
              // Retry the newly updated request and return it as the result of the auth refresh Observable
              // See: RxJS Higher-order Observable
              switchMap(() => next.handle(this.updateRequest(req))),
              catchError(err => {
                // Refresh token failed, logout user
                this.events.publish('user:logout', 'La sesión ha expirado');
                return throwError(err);
              }),
              tap(() => {
                // The refresh token has finished, then consequent request should perform refresh
                this.refreshTokenInProgress = false;
                // Let's inform other requests that the refreshing token has finished and therefore they can continue
                this.refreshTokenFinishedSubject.next(true);
              })
            )
          }
        }

        // If we don't handle the error then throw it again so others subscribers can handle it
        return throwError(err);
      })
    );
  }
}
