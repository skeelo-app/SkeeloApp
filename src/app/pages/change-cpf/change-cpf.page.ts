import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-change-cpf',
  templateUrl: './change-cpf.page.html',
  styleUrls: ['./change-cpf.page.scss'],
})
export class ChangeCpfPage implements OnInit {
  
  private form;
  private valid;

  @Input() option: Boolean;
  @Input() cpf: string;

  constructor(
    private skeeloAPI: SkeeloApiService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.option = navParams.get('option');
    this.cpf = navParams.get('cpf');
    this.form = formBuilder.group({
      cpf: ['', Validators.compose(
        [
          Validators.pattern('([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})'),
          Validators.required
        ]
      )]
    });
  }

  ngOnInit() {
  }

  toggle(value) {
    if (value) {
      this.option = true;
      this.form.controls["cpf"].enable();
      this.valid = false;
      this.check();
    } else {
      this.option = false;
      this.form.controls["cpf"].disable();
      this.valid = true;
    }
  }

  check() {
    if (this.form.valid) {
      // console.log(this.form.valid);
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  dismiss() {
    let cpf = this.form.value["cpf"];
    this.modalController.dismiss({
      'option': this.option,
      'cpf': cpf
    })
  }

  ionViewWillEnter() {
    this.toggle(this.option);
    if(this.cpf == null) {
      let id = this.storageService.getUserSettings().id;
      this.skeeloAPI.getUserByID(id).subscribe(([user]: any) => {
        if (user.user_cpf != null) {
          let cpf = user.user_cpf.toString();
          this.cpf = cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9);
          this.form.controls["cpf"].patchValue(this.cpf);
        }
      })
    } else {
      this.form.controls["cpf"].patchValue(this.cpf);
    }
  }

}
