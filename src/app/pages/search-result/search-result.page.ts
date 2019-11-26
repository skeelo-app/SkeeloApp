import { Component, OnInit, Input } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {

  @Input() id: string;

  store = {
    store_id: '',
    store_name: '',
    store_displayname: '',
  }

  constructor(
    private skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getStore();
  }

  search() {
  }

  getStore() {
    this.skeeloAPI.getStoreByID(this.id).subscribe(([result]: any) => {
      // console.log(result);
      this.store = result;
    })
  }

}
