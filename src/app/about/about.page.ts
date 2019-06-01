import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  menu = [
    {
      name: 'Termos de Uso',
      routerLink: '/'
    },
    {
      name: 'Políticas de Privacidade',
      routerLink: '/'
    }
  ]

  ngOnInit() {
  }

}
