import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
      birthdate: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(10)
        ]
      )],
      phone: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(15)
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
    this.storage.set('showIntro', false).then((value) => {
      console.log(value);
    });
    this.router.navigateByUrl('/tabs');
    console.log(this.signUpForm.value);
  }


}
