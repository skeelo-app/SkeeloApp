import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { SearchResultPage } from '../search-result/search-result.page';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  private id;

  store = {
    store_id: '',
    store_name: '',
    store_displayname: '',
  }

  categories = {
    category_id: '',
    category_name: '',
    category_description: ''
  }

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  async presentModal(store) {
    const modal = await this.modalController.create({
      component: SearchResultPage,
      componentProps: {
        'id': store
      },
      showBackdrop: true,
      cssClass: 'modal-search'
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {

    })
  }

  ngOnInit() {
  }

  search() {
    this.presentModal(this.id);
  }

  getStore() {
    this.skeeloAPI.getStoreByID(this.id).subscribe(([result]: any) => {
      // console.log(result);
      this.store = result;
    })
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getStore();
    this.getCategories();
  }

  getCategories() {
    this.skeeloAPI.getAllCategories().subscribe((result: any) => {
      console.log(result);
      this.categories = result;
    })
  }

}
