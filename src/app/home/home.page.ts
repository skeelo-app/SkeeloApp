import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from '../services/skeelo-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private skeeloAPI: SkeeloApiService,
    private storage: Storage,
  ) { }

  public user = {
    user_name: '',
		user_email: '',
		user_password: '',
		user_birthdate: '',
		user_country: '',
		user_phone: '',
		user_cpf: '',
		user_zip: ''
  }

  getID() {
    this.storage.get('id').then((value) => {
      this.getUserInfo(value);
    });
  }

  getUserInfo(id) {
    this.skeeloAPI.getUserByID(id).subscribe(([result]: any) => {
      this.user = result;
      let name = result.user_name
      this.user.user_name = name.split(' ')[0];
    })
  }

  promotions = [
    {
      text: 'Promoção A',
      routerLink: '/help'
    },
    {
      text: 'Promoção B',
      routerLink: '/about'
    }
  ];

  lastOrder = {
    id: '1',
    store: 'Mercado A',
    date: 'Dia 1 de janeiro',
    items: '50',
    price: 'R$10,00',
  }

  slideOpts = {
    loop: true
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getID();
  }

}
