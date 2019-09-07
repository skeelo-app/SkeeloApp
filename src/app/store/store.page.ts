import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from '../services/skeelo-api.service';

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

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService
  ) { }

  ngOnInit() {
  }

  getStore() {
    this.skeeloAPI.getStoreByID(this.id).subscribe(([result]: any) => {
      console.log(result);
      this.store = result;
    })
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getStore();
  }

}
