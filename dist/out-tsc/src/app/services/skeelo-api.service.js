import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let SkeeloApiService = class SkeeloApiService {
    constructor(http) {
        this.http = http;
        // private apiUrl = 'http://bicudo.sytes.net:3003/';
        this.apiUrl = 'http://localhost:3003/';
    }
    // USUARIOS
    getUserByID(id) {
        return this.http.get(this.apiUrl + 'users/id/' + id);
    }
    createUser(body) {
        let headers;
        return this.http.post(this.apiUrl + 'users/create', body, { headers });
    }
    getUserByEmail(email) {
        return this.http.get(this.apiUrl + 'users/email/' + email);
    }
    getUserByCpf(cpf) {
        return this.http.get(this.apiUrl + 'users/cpf/' + cpf);
    }
    getUserByPhone(phone) {
        return this.http.get(this.apiUrl + 'users/phone/' + phone);
    }
    // PEDIDOS
    getOrdersByUser(owner) {
        return this.http.get(this.apiUrl + 'orders/user/' + owner);
    }
    getOrdersByID(id) {
        return this.http.get(this.apiUrl + 'orders/id/' + id);
    }
    // LOJAS
    getStoreByID(id) {
        return this.http.get(this.apiUrl + 'stores/id/' + id);
    }
    // ITEMS
    getItemByID(id) {
        return this.http.get(this.apiUrl + 'items/id/' + id);
    }
    // LOCALIZAÇÃO
    getLocationByID(id) {
        return this.http.get(this.apiUrl + 'locations/id/' + id);
    }
};
SkeeloApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], SkeeloApiService);
export { SkeeloApiService };
//# sourceMappingURL=skeelo-api.service.js.map