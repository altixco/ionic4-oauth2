import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { of, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenData: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private utils: UtilsService
  ) { }

  public login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password)
      .set('client_id', environment.CLIENT_ID);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('/o/token/', params, { headers }).pipe(
      tap(tokenData => {
        this.storage.set('tokenData', tokenData).then(() => {
          console.log('Login succeeded, token saved');
        });
        this.tokenData = tokenData;
        return tokenData;
      })
    )
  }

  public refresh() {
    if (!this.isLoggedIn()) {
      return throwError('There is not refresh token');
    }

    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', this.tokenData['refresh_token'])
      .set('client_id', environment.CLIENT_ID);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('/o/token/', params, { headers }).pipe(
      tap(tokenData => {
        this.storage.set('tokenData', tokenData).then(() => {
          console.log('Refresh succeeded, token saved');
        });
        this.tokenData = tokenData;
        return tokenData;
      })
    )
  }

  public register(params) {
    return this.http.post('/api/main/user/register/', params);
  }

  public logout(): Observable<any> {
    if (!this.utils.isDefined(this.tokenData)) {
      this.storage.remove("tokenData");
      return of(true);
    }

    const params = new HttpParams()
      .set('token', this.tokenData['access_token'])
      .set('client_id', environment.CLIENT_ID);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('/o/revoke_token/', params, { headers }).pipe(
      tap(() => {
        this.storage.remove("tokenData");
        this.tokenData = null;
      })
    )
  }

  public test(): Observable<any> {
    return this.http.get('/api/inventory/categories/').pipe(
      tap(data => {
        return data;
      })
    )
  }

  public isLoggedIn(): Boolean {
    return this.utils.isDefined(this.tokenData);
  }

  public getAuthorizationHeader(): String {
    return `${this.tokenData["token_type"]} ${this.tokenData["access_token"]}`;
  }

  public async loadTokenData(): Promise<any> {
    try {
      if (!this.utils.isDefined(this.tokenData)) {
        this.tokenData = await this.storage.get('tokenData');
      }
    } catch {
      this.tokenData = null;
    }
    // TODO: Remove console log
    console.log('Current token data:', this.tokenData);
    return this.tokenData;
  }
}
