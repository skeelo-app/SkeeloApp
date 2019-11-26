import { Component, OnInit } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private id;
  private icon = '../../../assets/icons/eye-regular.svg';
  private typepassword = 'password';

  user = {
    user_id: '',
    user_name: '',
    user_displayName: '',
    user_email: '',
    user_password: '',
    user_passwordDecrypted: '',
    user_birthdate: '',
    user_birthdateFormated: '',
    user_country: '',
    user_phone: '',
    user_cpf: '',
    user_zip: ''
  }

  public editProfileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private skeeloAPI: SkeeloApiService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private router: Router,
  ) {
    this.editProfileForm = formBuilder.group({
      name: [{value: this.user.user_name, disabled: false}, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*')
        ]
      )],
      cpf: [{value: this.user.user_cpf, disabled: true}, Validators.compose(
        [
          Validators.pattern('([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})')
        ]
      )],
      email: [{value: this.user.user_email, disabled: false}, Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,15})$')
        ]
      )],
      password: [{value: this.user.user_password, disabled: false}, Validators.compose(
        [
          Validators.required,
          Validators.minLength(6)
        ]
      )],
      phone: [{value: this.user.user_phone, disabled: true}, Validators.compose(
        [
          Validators.required,
          Validators.minLength(15)
        ]
      )],
      birthdate: [{value: this.user.user_birthdate, disabled: true}, Validators.compose(
        [
          Validators.required,
          Validators.minLength(10)
        ]
      )]
    });
  }

  ngOnInit() {
  }

  formatDates() {
    let data = new Date(this.user.user_birthdate);
    let formatedDate = data.toLocaleDateString();
    this.user.user_birthdateFormated = formatedDate;
  }

  formatCPF() {
    let cpf = this.user.user_cpf.toString();
    this.user.user_cpf = cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9);
  }

  formatPhone() {
    let phone = this.user.user_phone.toString();
    this.user.user_phone = '(' + phone.slice(0,2) + ') ' + phone.slice(2,3) + ' ' + phone.slice(3,7) + '-' + phone.slice(7);
  }

  formatPassword() {
    let pepper = this.user.user_email + '28052018';
    let password = CryptoJS.AES.decrypt(this.user.user_password, pepper, {
      keySize: 128/8
    });
    this.user.user_passwordDecrypted = password.toString(CryptoJS.enc.Utf8);
  }

  getUserData(){
    this.skeeloAPI.getUserByID(this.id).subscribe(([result]: any) => {
      // console.log(result);
      this.user = result;
      this.user.user_displayName = result.user_name.split(" ", 1).toString();
      this.formatDates();
      this.formatCPF();
      this.formatPhone();
      this.formatPassword();
      this.setFormValues();
    })
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      message: 'Dados alterados com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/tabs');
          }
        }
      ]
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      message: 'Não foi possível alterar seus dados! Tente novamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  cryptoPassword() {
    let password = this.editProfileForm.value["password"];
    let pepper = this.editProfileForm.value["email"] + '28052018';
    let crypto = CryptoJS.AES.encrypt(password, pepper, {
      keySize: 128/8
    });
    this.editProfileForm.value["password"] = crypto.toString();
    this.user.user_password = this.editProfileForm.value["password"];
  }

  submit() {
    let body;

    // CRIPTOGRAFIA DA SENHA
    this.cryptoPassword();
    

    body = {
      'user_name': this.editProfileForm.value["name"],
      'user_email': this.user.user_email,
      'user_password': this.user.user_password,
      'user_zip': this.user.user_zip
    };

    // ENVIA OS DADOS PARA A API
    this.skeeloAPI.editUser(this.id, body)
      .subscribe(result => {
        if(result == 201) {
          this.alertSuccess();
        } else {
          this.alertError();
        }
    });
  };

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUserData();
  }

  setFormValues() {
    this.editProfileForm.controls["name"].patchValue(this.user.user_name);
    this.editProfileForm.controls["cpf"].patchValue(this.user.user_cpf);
    this.editProfileForm.controls["email"].patchValue(this.user.user_email);
    this.editProfileForm.controls["password"].patchValue(this.user.user_passwordDecrypted);
    this.editProfileForm.controls["phone"].patchValue(this.user.user_phone);
    this.editProfileForm.controls["birthdate"].patchValue(this.user.user_birthdateFormated);
  }

  togglePassword() {
    if (this.typepassword == 'password') {
      this.typepassword = 'text';
      this.icon = '../../../assets/icons/eye-slash-regular.svg';
    } else {
      this.typepassword = 'password';
      this.icon = '../../../assets/icons/eye-regular.svg';
    }
  }

}
