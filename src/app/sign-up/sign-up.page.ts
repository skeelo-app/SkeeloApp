import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkeeloApiService } from '../services/skeelo-api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  public signUpForm: FormGroup;

  constructor(
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    private skeeloAPI: SkeeloApiService
  ) {
    this.signUpForm = formBuilder.group({
      name: ['', Validators.compose(
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*')
        ]
      )],
      cpf: ['', Validators.compose(
        [
          Validators.pattern('([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})')
        ]
      )],
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
      phone: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(15)
        ]
      )],
      birthdate: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(10)
        ]
      )],
      zip: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(10)
        ]
      )]
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
    this.signUpForm.reset();
  }

  submit() {
    let body;

    // FORMATAÇÃO DO TELEFONE
    let phone = this.signUpForm.value["phone"].replace('(', '').replace(')', '').replace('-', '');
    this.signUpForm.value["phone"] = phone.replace(/\s+/g, '');

    // FORMATAÇÃO DO ZIP
    let zip = this.signUpForm.value["zip"].replace(/\./g, '').replace('-', '');
    this.signUpForm.value["zip"] = zip;

    // CRIPTOGRAFIA DA SENHA
    let password = this.signUpForm.value["password"];
    let pepper = this.signUpForm.value["email"] + '1d0ntkn0w!';
    let crypto = CryptoJS.AES.encrypt(password, pepper, {
      keySize: 128/8
    });
    this.signUpForm.value["password"] = crypto.toString();

    if (this.signUpForm.value["cpf"] == '') {
      body = {
        'user_name': this.signUpForm.value["name"],
        'user_email': this.signUpForm.value["email"],
        'user_password': this.signUpForm.value["password"],
        'user_birthdate': this.signUpForm.value["birthdate"],
        'user_phone': this.signUpForm.value["phone"],
        'user_zip': this.signUpForm.value["zip"]
      };
    } else {
      let cpf = this.signUpForm.value["cpf"].replace(/\./g, '');
      this.signUpForm.value["cpf"] = cpf.replace('-', '');
      body = {
        'user_name': this.signUpForm.value["name"],
        'user_email': this.signUpForm.value["email"],
        'user_password': this.signUpForm.value["password"],
        'user_birthdate': this.signUpForm.value["birthdate"],
        'user_cpf': this.signUpForm.value["cpf"],
        'user_phone': this.signUpForm.value["phone"],
        'user_zip': this.signUpForm.value["zip"]
      };
    };
    this.skeeloAPI.createUser(body).subscribe(result => {
      console.log(result);
      if (result == 201) {
        console.log("Usuário criado com sucesso!");
        this.router.navigateByUrl('/tabs');
        this.storage.set('showIntro', false);
      }
    });
    console.log(body);
  }


}
