import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@commons/environments';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  Auth,
} from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public path: string = environment.auth.apiBaseUrl;
  public key: string = environment.auth.key;

  constructor(private http: HttpClient) {}

  public login(body): Observable<any> {
    return this.http
      .post(`${this.path}/v1/accounts:signInWithPassword?key=${this.key}`, body)
      .pipe(
        map((response: any) => {
          this.authSuccess(response.idToken, response.localId);
          return response;
        })
      );
  }

  public login2(email: string, password: string) {
    return from(signInWithEmailAndPassword(null, email, password));
  }

  public signup(body: any) {
    return this.http.post(
      `${this.path}/v1/accounts:signUp?key=${this.key}`,
      body
    );
  }

  private authSuccess(token: string, userId: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public getUserId() {
    return sessionStorage.getItem('userId');
  }
}
