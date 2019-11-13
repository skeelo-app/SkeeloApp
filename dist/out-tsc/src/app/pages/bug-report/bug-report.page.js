import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
let BugReportPage = class BugReportPage {
    constructor(formBuilder, router, skeeloAPI, storage, alertController) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.skeeloAPI = skeeloAPI;
        this.storage = storage;
        this.alertController = alertController;
        this.bugForm = formBuilder.group({
            name: [{ value: this.name, disabled: true }, Validators.required],
            email: [{ value: this.email, disabled: true }, Validators.required],
            subject: ['', Validators.required],
            textarea: ['', Validators.required]
        });
    }
    ngOnInit() {
    }
    alertSuccess() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
            yield alert.present();
        });
    }
    report() {
        console.log(this.bugForm.value);
        this.alertSuccess();
    }
    getID() {
        this.storage.get('userSettings').then((value) => {
            let id = JSON.parse(value).id;
            this.getUserInfo(id);
        });
    }
    getUserInfo(id) {
        this.skeeloAPI.getUserByID(id).subscribe(([result]) => {
            this.name = result.user_name;
            this.email = result.user_email;
            this.bugForm.controls["name"].patchValue(this.name);
            this.bugForm.controls["email"].patchValue(this.email);
        });
    }
    ngAfterViewInit() {
        this.getID();
    }
};
BugReportPage = tslib_1.__decorate([
    Component({
        selector: 'app-bug-report',
        templateUrl: './bug-report.page.html',
        styleUrls: ['./bug-report.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        Router,
        SkeeloApiService,
        Storage,
        AlertController])
], BugReportPage);
export { BugReportPage };
//# sourceMappingURL=bug-report.page.js.map