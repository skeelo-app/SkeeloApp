import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
let IntroPage = class IntroPage {
    constructor(skeeloAPI) {
        this.skeeloAPI = skeeloAPI;
    }
    ngOnInit() {
    }
};
IntroPage = tslib_1.__decorate([
    Component({
        selector: 'app-intro',
        templateUrl: './intro.page.html',
        styleUrls: ['./intro.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [SkeeloApiService])
], IntroPage);
export { IntroPage };
//# sourceMappingURL=intro.page.js.map