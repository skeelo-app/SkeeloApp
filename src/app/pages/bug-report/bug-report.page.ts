import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storageService/storage.service';

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
    private storageService: StorageService,
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
    // console.log(this.bugForm.value);
    this.alertSuccess();
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
    let id = this.storageService.getUserSettings().id;
    this.getUserInfo(id);
  }

}
