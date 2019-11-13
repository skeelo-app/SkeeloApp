import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
let UserApiService = class UserApiService {
    constructor(storage) {
        this.storage = storage;
    }
    getUserSettings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storage.get('userSettings');
        });
    }
    getUserID() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storage.get('userSettings')
                .then((value) => {
                let userSettings = JSON.parse(value).id;
                return userSettings;
            })
                .catch((error) => {
                return error;
            });
        });
    }
    getUserDarkMode() {
        return this.storage.get('userSettings').then((value) => {
            let userSettings = JSON.parse(value).darkMode;
            return userSettings;
        });
    }
    getUserShowIntro() {
        return this.storage.get('userSettings').then((value) => {
            let userSettings = JSON.parse(value).showIntro;
            return userSettings;
        });
    }
    getUserNotifications() {
        return this.storage.get('userSettings').then((value) => {
            let userSettings = JSON.parse(value).notifications;
            return userSettings;
        });
    }
};
UserApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Storage])
], UserApiService);
export { UserApiService };
//# sourceMappingURL=user-api.service.js.map