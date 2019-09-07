import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from '../services/skeelo-api.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  private id;

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService
  ) { }

  item = {
    item_id: '',
    item_store: '',
    item_storename: '',
    item_barcode: '',
    item_category: '',
    item_name: '',
    item_description: '',
    item_amount: '',
    item_price: '',
    item_discount: '',
    item_discounttype: '',
    item_discountpercent: '',
    item_discountminus: '',
    item_pricewithdiscount: ''
  }

  ngOnInit() {
  }

  getItemDetails(){
    this.skeeloAPI.getItemByID(this.id).subscribe(([result]: any) => {
      this.item.item_id = this.id;
      this.item = result;
      if (result.item_discount == 1) {
        if (result.item_discounttype == 0) {
          let newprice =  parseFloat(result.item_price) - ((parseFloat(result.item_price) / 100) * result.item_discountpercent);
          let formatedPrice = (newprice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'}); 
          this.item.item_pricewithdiscount = formatedPrice;
        } else if (result.item_discounttype == 1) {
          let newprice = parseFloat(result.item_price) - parseFloat(result.item_discountminus);
          let formatedPrice = (newprice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
          this.item.item_pricewithdiscount = formatedPrice;
        }
      }
      this.formatCurrency();
      this.getStoreName();
      console.log(result);
      console.log(this.item);
    })
  }

  getStoreName() {
    this.skeeloAPI.getStoreByID(this.item.item_store).subscribe(([result]: any) => {
      this.item.item_storename = result.store_displayname;
    });
  }

  formatCurrency() {
    let value = parseFloat(this.item.item_price);
    let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup'});
    this.item.item_price = formatedPrice;
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getItemDetails();
  }

}
