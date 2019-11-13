import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { Storage } from '@ionic/storage';
import { ModalController, NavParams } from '@ionic/angular';
let ChangeCpfPage = class ChangeCpfPage {
    constructor(skeeloAPI, formBuilder, storage, modalController, navParams) {
        this.skeeloAPI = skeeloAPI;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.modalController = modalController;
        this.navParams = navParams;
        this.option = navParams.get('option');
        this.cpf = navParams.get('cpf');
        this.form = formBuilder.group({
            cpf: ['', Validators.compose([
                    Validators.pattern('([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})'),
                    Validators.required
                ])]
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
        }
        else {
            this.option = false;
            this.form.controls["cpf"].disable();
            this.valid = true;
        }
    }
    check() {
        if (this.form.valid) {
            console.log(this.form.valid);
            this.valid = true;
        }
        else {
            this.valid = false;
        }
    }
    dismiss() {
        let cpf = this.form.value["cpf"];
        this.modalController.dismiss({
            'option': this.option,
            'cpf': cpf
        });
    }
    ionViewWillEnter() {
        this.toggle(this.option);
        if (this.cpf == null) {
            this.storage.get('userSettings').then((value) => {
                let id = JSON.parse(value).id;
                this.skeeloAPI.getUserByID(id).subscribe(([user]) => {
                    if (user.user_cpf != null) {
                        let cpf = user.user_cpf.toString();
                        this.cpf = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9);
                        this.form.controls["cpf"].patchValue(this.cpf);
                    }
                });
            });
        }
        else {
            this.form.controls["cpf"].patchValue(this.cpf);
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], ChangeCpfPage.prototype, "option", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ChangeCpfPage.prototype, "cpf", void 0);
ChangeCpfPage = tslib_1.__decorate([
    Component({
        selector: 'app-change-cpf',
        templateUrl: './change-cpf.page.html',
        styleUrls: ['./change-cpf.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [SkeeloApiService,
        FormBuilder,
        Storage,
        ModalController,
        NavParams])
], ChangeCpfPage);
export { ChangeCpfPage };
//# sourceMappingURL=change-cpf.page.js.map