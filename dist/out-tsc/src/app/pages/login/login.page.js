import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
let LoginPage = class LoginPage {
    constructor(storage, router, formBuilder, skeeloAPI, alertController) {
        this.storage = storage;
        this.router = router;
        this.formBuilder = formBuilder;
        this.skeeloAPI = skeeloAPI;
        this.alertController = alertController;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,15})$')
                ])],
            password: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])],
        });
    }
    ngAfterViewInit() {
        this.slides.lockSwipes(true);
    }
    ngOnInit() {
    }
    goToLogin() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }
    return() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
        this.loginForm.reset();
    }
    alertSuccess() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Usuário logado com sucesso!',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.router.navigateByUrl('/tabs');
                            let userSettings = {
                                'showIntro': false,
                                'id': this.id,
                                'darkMode': false,
                                'notifications': {
                                    'push': true,
                                    'email': true,
                                    'whatsApp': true,
                                    'SMS': true
                                }
                            };
                            this.storage.set('userSettings', JSON.stringify(userSettings));
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    wrongPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Senha incorreta!',
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    emailError() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Este endereço de e-mail não está cadastrado!',
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    decrypt(cryptopass) {
        let pepper = this.loginForm.value["email"] + '28052018';
        let password = CryptoJS.AES.decrypt(cryptopass, pepper, {
            keySize: 128 / 8
        });
        this.decrypted = password.toString(CryptoJS.enc.Utf8);
    }
    login() {
        this.skeeloAPI.getUserByEmail(this.loginForm.value['email'])
            .subscribe(([result]) => {
            if (result == undefined) {
                this.emailError();
            }
            else {
                let crypto = result.user_password;
                this.decrypt(crypto);
                if (this.decrypted == this.loginForm.value['password']) {
                    this.id = result.user_id;
                    this.alertSuccess();
                }
                else {
                    this.wrongPassword();
                }
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(IonSlides, { static: false }),
    tslib_1.__metadata("design:type", IonSlides)
], LoginPage.prototype, "slides", void 0);
LoginPage = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Storage,
        Router,
        FormBuilder,
        SkeeloApiService,
        AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map