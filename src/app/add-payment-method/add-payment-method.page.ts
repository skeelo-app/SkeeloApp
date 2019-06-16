import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.page.html',
  styleUrls: ['./add-payment-method.page.scss'],
})
export class AddPaymentMethodPage implements OnInit {

  public cardForm: FormGroup;

  constructor(
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.cardForm = formBuilder.group({
      card_number: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(19)
        ]
      )],
      exp_date: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(5)
        ]
      )],
      cvv: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3)
        ]
      )],
      holder: ['', Validators.compose(
        [
          Validators.required,
        ]
      )],
      cpf: ['', Validators.compose(
        [
          Validators.required,
          Validators.minLength(14)
        ]
      )],
      method_name: ['', Validators.compose(
        [
          Validators.required,
        ]
      )]
    });
  }

  ngOnInit() {
  }

  save() {
    console.log(this.cardForm.value);
  }

}
