import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
let ProfilePage = class ProfilePage {
    constructor(route, skeeloAPI) {
        this.route = route;
        this.skeeloAPI = skeeloAPI;
        this.user = {
            user_id: '',
            user_name: '',
            user_displayName: '',
            user_email: '',
            user_password: '',
            user_birthdate: '',
            user_country: '',
            user_phone: '',
            user_cpf: '',
            user_zip: ''
        };
    }
    ngOnInit() {
    }
    formatDates() {
        let data = new Date(this.user.user_birthdate);
        let formatedDate = data.toLocaleDateString();
        this.user.user_birthdate = formatedDate;
    }
    formatCPF() {
        let cpf = this.user.user_cpf.toString();
        this.user.user_cpf = cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9);
    }
    formatPhone() {
        let phone = this.user.user_phone.toString();
        this.user.user_phone = '(' + phone.slice(0, 2) + ') ' + phone.slice(2, 3) + ' ' + phone.slice(3, 7) + '-' + phone.slice(7);
    }
    getUserData() {
        this.skeeloAPI.getUserByID(this.id).subscribe(([result]) => {
            console.log(result);
            this.user = result;
            this.user.user_displayName = result.user_name.split(" ", 1).toString();
            this.formatDates();
            this.formatCPF();
            this.formatPhone();
        });
    }
    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getUserData();
    }
};
ProfilePage = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.page.html',
        styleUrls: ['./profile.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        SkeeloApiService])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map