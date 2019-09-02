import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkeeloApiService } from '../services/skeelo-api.service';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  public loginForm: FormGroup;

  constructor(
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    private skeeloAPI: SkeeloApiService,
    public alertController: AlertController
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,15})$')
        ]
      )],
      password: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(6)
        ]
      )],
    });
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  goToLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  return() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.loginForm.reset();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      message: 'Usuário logado com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/tabs');
          this.storage.set('showIntro', false);
          }
        }
      ]
    });

    await alert.present();
  }

  async wrongPassword() {
    const alert = await this.alertController.create({
      message: 'Senha incorreta!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async emailError() {
    const alert = await this.alertController.create({
      message: 'Este endereço de e-mail não está cadastrado!',
      buttons: ['OK']
    });

    await alert.present();
  }

  private decrypted;

  decrypt(cryptopass) {
    let pepper = this.loginForm.value["email"] + '28052018';
    let password = CryptoJS.AES.decrypt(cryptopass, pepper, {
      keySize: 128/8
    });
    this.decrypted = password.toString(CryptoJS.enc.Utf8);
  }

  login() {
    this.skeeloAPI.getUserByEmail(this.loginForm.value['email'])
    .subscribe(
      ([result]: any) => {
        if (result == undefined) {
          this.emailError();
        } else {
          let crypto = result.user_password;
          this.decrypt(crypto);
          if(this.decrypted == this.loginForm.value['password']) {
            this.alertSuccess();
          } else {
            this.wrongPassword();
          }
        }
      }
    );
  }

}