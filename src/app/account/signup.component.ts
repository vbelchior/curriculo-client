import { AngularUtil } from '../../commons/utils/angular.util';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
@Component({
  selector: 'account-signup',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <mat-card fxFlex="40" fxFlex.lt-md="90">
        <mat-card-title>
          <h4>Bem vindo!</h4>
        </mat-card-title>
        <mat-card-subtitle>
          <p>Para começar a preencher seu curriculo, preencha os dados.</p>
        </mat-card-subtitle>
        <mat-card-content fxLayout="row wrap" [formGroup]="formGroup">
          <span>Insira os dados abaixo</span>

          <div fxLayout="row" fxFlex="100">
            <mat-form-field fxFlex="100">
              <input
                matInput
                formControlName="name"
                placeholder="Nome"
                required
              />
            </mat-form-field>
          </div>
          <div fxLayout="row" fxFlex="100">
            <mat-form-field fxFlex="100">
              <input
                matInput
                formControlName="email"
                type="email"
                placeholder="Email"
                required
              />
            </mat-form-field>
          </div>
          <div fxFlex="100" fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field fxFlex="49">
              <input
                matInput
                formControlName="secret"
                type="password"
                placeholder="Senha"
                required
              />
            </mat-form-field>
            <mat-form-field fxFlex="49">
              <input
                matInput
                formControlName="secretConfirmation"
                type="password"
                placeholder="Confirmação"
                required
              />
            </mat-form-field>
          </div>
        </mat-card-content>
        <mat-card-actions fxLayout="row" fxLayoutAlign="space-between">
          <button mat-button (click)="onLogin()">Já possui conta?</button>
          <button mat-button color="primary" (click)="onSignup()">
            <span>CRIAR CONTA</span>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: limegreen;
      }
      mat-card {
        background: rgba(255, 255, 255, 0.9);
        margin-bottom: 1em;
        margin-top: 1em;
      }
      mat-card-actions[override] {
        max-width: none;
      }
    `,
  ],
})
export class SignupComponent {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      secret: ['', Validators.required],
      secretConfirmation: ['', Validators.required],
    });
  }

  public onLogin(): void {
    this.router.navigate(['login']);
  }

  public onSignup() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.authService
        .signup({
          email: this.formGroup.get('email').value,
          password: this.formGroup.get('secret').value,
          returnSecureToken: true,
        })
        .subscribe((response) => {
          this.router.navigate(['login']);
        });
    }
  }
}
