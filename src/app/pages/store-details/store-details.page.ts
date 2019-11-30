import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.page.html',
  styleUrls: ['./store-details.page.scss'],
})
export class StoreDetailsPage implements OnInit {

  private id;

  store = {
    store_id: '',
    store_name: '',
    store_displayname: '',
    store_cnpj: '',
    store_phone: '',
    store_imageurl: '',
    store_owner: '',
    store_location: '',
    store_rate: '',
    store_numrates: '',
    store_locationInfo: {}
  }

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }
  
  getStore() {
    this.skeeloAPI.getStoreByID(this.id).subscribe(([result]: any) => {
      // console.log(result);
      this.store = result;
      let phone = result.store_phone;
      let phoneMask = '(' + phone.slice(0,2) + ') ' + phone.slice(2,6) + '-' + phone.slice(6,10);
      this.store.store_phone = phoneMask;
      this.store.store_rate = '4.2';
      this.store.store_numrates = '10';
      this.skeeloAPI.getLocationByID(this.store.store_location).subscribe(([locResult]: any) => {
        this.store.store_locationInfo = locResult;
      });
    })
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getStore();
  }

}
