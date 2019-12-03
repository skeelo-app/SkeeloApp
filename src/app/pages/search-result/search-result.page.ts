import { Component, OnInit, Input } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {

  @Input() id: string;

  public items;
  public completeList;
  public search: string = '';

  store = {
    store_id: '',
    store_name: '',
    store_displayname: '',
  }

  constructor(
    private skeeloAPI: SkeeloApiService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getStore();
  }

  getItems() {
    this.skeeloAPI.getAllItemsByStore(this.store.store_id).subscribe((result: any) => {
      this.items = result;
      this.completeList = result;
      let length = result.length;
      for(let i = 0; i < length; i++) {
        let value = parseFloat(result[i].item_price);
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
        this.items[i].item_price = formatedPrice;
        this.items[i].item_name = result[i].item_name.toLowerCase();
      }
      console.log(this.items);
    })
  }

  filterList(list, filter) {
    return list.filter(item => {
      return item.item_name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    })
  }

  filter(){
    this.items = this.filterList(this.completeList, this.search)
  }

  return() {
    this.modalController.dismiss();
  }

  getStore() {
    this.skeeloAPI.getStoreByID(this.id).subscribe(([result]: any) => {
      // console.log(result);
      this.store = result;
      this.getItems();
    })
  }

}
