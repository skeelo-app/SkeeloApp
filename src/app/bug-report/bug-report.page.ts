import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkeeloApiService } from '../services/skeelo-api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.page.html',
  styleUrls: ['./bug-report.page.scss'],
})
export class BugReportPage implements OnInit {

  public bugForm: FormGroup;
  public name;
  public email;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private skeeloAPI: SkeeloApiService,
    private storage: Storage,
    public alertController: AlertController
  ) {
    this.bugForm = formBuilder.group({
      name: [{value: this.name, disabled: true}, Validators.required],
      email: [{value: this.email, disabled: true}, Validators.required],
      subject: ['', Validators.required],
      textarea: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'Agradecemos pela ajuda ❤',
      message: 'Bug reportado com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/');
          }
        }
      ]
    });

    await alert.present();
  }

  report() {
    console.log(this.bugForm.value);
    this.alertSuccess();
  }

  getID() {
    this.storage.get('id').then((value) => {
      this.getUserInfo(value);
    });
  }

  getUserInfo(id) {
    this.skeeloAPI.getUserByID(id).subscribe(([result]: any) => {
      this.name = result.user_name;
      this.email = result.user_email;
      this.bugForm.controls["name"].patchValue(this.name);
      this.bugForm.controls["email"].patchValue(this.email);
    })
  }

  ngAfterViewInit() {
    this.getID();
  }

}
