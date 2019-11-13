import { Component } from '@angular/core';
import { StorageService } from '../services/storageService/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  private cartBadge;

  constructor(
    private storageService: StorageService
  ) {}

  ionViewWillEnter() {
    this.cartBadge = this.storageService.getCart().length;
  }

}
