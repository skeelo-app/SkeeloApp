import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-payment-method',
  templateUrl: './edit-payment-method.page.html',
  styleUrls: ['./edit-payment-method.page.scss'],
})
export class EditPaymentMethodPage implements OnInit {

  public cardForm: FormGroup;

  constructor(
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.cardForm = formBuilder.group({
      exp_date: [this.card.valid, Validators.compose(
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
      holder: [this.card.titular_name, Validators.compose(
        [
          Validators.required,
        ]
      )],
      cpf: [this.card.titular_cpf, Validators.compose(
        [
          Validators.required,
          Validators.minLength(14)
        ]
      )],
      method_name: [this.card.name, Validators.compose(
        [
          Validators.required,
        ]
      )]
    });
  }

  card = {
    id: '1',
    name: 'Cartão A',
    last_numbers: '1164',
    valid: '02/2020',
    titular_name: 'Roberto Willians de la Penha',
    titular_cpf: '55544433322'
  };

  async alert() {
    const alert = await this.alertController.create({
      header: 'Você quer mesmo excluir esse cartão?',
      message: 'Todos os dados salvos serão apagados do aplicativo.',
      buttons: [
        {
          text: 'Excluir cartão',
          cssClass: 'alertOkay',
          handler: () => {
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

  delete() {
    this.alert();
  }

}
