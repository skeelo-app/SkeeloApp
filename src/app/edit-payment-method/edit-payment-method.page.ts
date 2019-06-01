import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-payment-method',
  templateUrl: './edit-payment-method.page.html',
  styleUrls: ['./edit-payment-method.page.scss'],
})
export class EditPaymentMethodPage implements OnInit {

  constructor() { }

  card = {
    id: '1',
    name: 'Cartão A',
    last_numbers: '1164',
    valid: '02/2020',
    titular_name: 'Roberto Willians de la Penha',
    titular_cpf: '55544433322'
  };

  ngOnInit() {
  }

}
