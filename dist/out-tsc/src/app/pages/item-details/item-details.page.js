import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeeloApiService } from 'src/app/services/skeeloApi/skeelo-api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
let ItemDetailsPage = class ItemDetailsPage {
    constructor(route, skeeloAPI, storage, alertController, router) {
        this.route = route;
        this.skeeloAPI = skeeloAPI;
        this.storage = storage;
        this.alertController = alertController;
        this.router = router;
        this.cart = 0;
        this.item = {
            item_id: '',
            item_store: '',
            item_storename: '',
            item_barcode: '',
            item_category: '',
            item_name: '',
            item_description: '',
            item_amount: '',
            item_price: '',
            item_discount: '',
            item_discounttype: '',
            item_discountpercent: '',
            item_discountminus: '',
            item_pricewithdiscount: '',
            item_cartCounter: 1,
            item_cartPrice: ''
        };
    }
    ngOnInit() {
    }
    getItemDetails() {
        this.skeeloAPI.getItemByID(this.id).subscribe(([result]) => {
            this.item.item_id = this.id;
            this.item = result;
            if (result.item_discount == 1) {
                if (result.item_discounttype == 0) {
                    let newprice = parseFloat(result.item_price) - ((parseFloat(result.item_price) / 100) * result.item_discountpercent);
                    let formatedPrice = (newprice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
                    this.item.item_pricewithdiscount = formatedPrice;
                }
                else if (result.item_discounttype == 1) {
                    let newprice = parseFloat(result.item_price) - parseFloat(result.item_discountminus);
                    let formatedPrice = (newprice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
                    this.item.item_pricewithdiscount = formatedPrice;
                }
            }
            this.formatCurrency();
            this.getStoreName();
            this.item.item_cartPrice = result.item_price;
            this.item.item_cartCounter = 1;
        });
    }
    getStoreName() {
        this.skeeloAPI.getStoreByID(this.item.item_store).subscribe(([result]) => {
            this.item.item_storename = result.store_displayname;
        });
    }
    formatCurrency() {
        let value = parseFloat(this.item.item_price);
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
        this.item.item_price = formatedPrice;
    }
    minusCart() {
        if (this.item.item_cartCounter > 1) {
            this.item.item_cartCounter--;
        }
        let price = parseFloat(this.item.item_price.toString().slice(3).replace(',', '.'));
        let value = price * this.item.item_cartCounter;
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
        this.item.item_cartPrice = formatedPrice;
    }
    plusCart() {
        this.item.item_cartCounter++;
        let price = parseFloat(this.item.item_price.toString().slice(3).replace(',', '.'));
        let value = price * this.item.item_cartCounter;
        let formatedPrice = (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', localeMatcher: 'lookup' });
        this.item.item_cartPrice = formatedPrice;
    }
    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getItemDetails();
    }
    alertExists() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Esse produto já existe em seu carrinho! Deseja adicionar novamente?',
                buttons: [
                    {
                        text: 'Não'
                    },
                    {
                        text: 'Sim',
                        handler: () => {
                            this.add();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    alertSuccess() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Produto adicionado com sucesso!',
                buttons: [
                    {
                        text: 'Ir para o carrinho',
                        handler: () => {
                            this.router.navigateByUrl('/tabs/cart');
                        }
                    },
                    {
                        text: 'OK'
                    }
                ]
            });
            yield alert.present();
        });
    }
    alertStore() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: 'Você já tem itens de outra loja adicionados ao seu carrinho!',
                message: 'Deseja limpar seu carrinho?',
                buttons: [
                    {
                        text: 'Não'
                    },
                    {
                        text: 'Sim',
                        handler: () => {
                            this.continue();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    addToCart() {
        this.storage.get('cart').then((value) => {
            // console.log('str', value);
            let cartArray = JSON.parse(value);
            // console.log(cartArray);
            this.cart = cartArray.length;
            // VERIFICA SE O CARRINHO ESTÁ VAZIO
            if (this.cart != 0) {
                // console.log('1 IF');
                this.skeeloAPI.getItemByID(cartArray[0].item_id).subscribe(([result]) => {
                    // VERIFICA SE O PRODUTO QUE ESTÁ NO CARRINHO É DA MESMA LOJA DO PRODUTO A SER ADICIONADO
                    if (result.item_store == this.item.item_store) {
                        // console.log('2 IF');
                        // console.log('STORE:', result.item_store);
                        for (let i = 0; i < this.cart; i++) {
                            // VERIFICA SE O PRODUTO JÁ EXISTE NO CARRINHO
                            if (cartArray[i].item_id == this.item.item_id) {
                                // console.log('3 IF');
                                // console.log('CONTADOR: ', i);
                                // console.log('VALOR DO ARRAY: ', cartArray[i]);
                                this.alertExists();
                                // console.log(cartArray);
                            }
                            else if (i + 1 == this.cart) {
                                // console.log('3 ELSE');
                                // console.log('CONTADOR: ', i);
                                // console.log('VALOR DO ARRAY: ', cartArray[i]);
                                // console.log('ID ADICIONADO: ', this.item.item_id);
                                // console.log('LENGTH DO ARRAY: ', this.cart);
                                cartArray[this.cart] = {
                                    item_id: this.item.item_id,
                                    item_quantity: this.item.item_cartCounter
                                };
                                this.storage.set('cart', JSON.stringify(cartArray));
                                this.alertSuccess();
                                // console.log(cartArray);
                            }
                        }
                    }
                    else {
                        this.alertStore();
                        // console.log('2 ELSE');
                    }
                });
            }
            else {
                // console.log('1 ELSE');
                // console.log('ID ADICIONADO: ', this.item.item_id);
                // console.log('LENGTH DO ARRAY: ', this.cart);
                cartArray[this.cart] = {
                    item_id: this.item.item_id,
                    item_quantity: this.item.item_cartCounter
                };
                this.storage.set('cart', JSON.stringify(cartArray));
                this.alertSuccess();
            }
        });
    }
    continue() {
        let cart = [];
        this.storage.set('cart', JSON.stringify(cart));
        this.addToCart();
    }
    add() {
        this.storage.get('cart').then((value) => {
            let cartArray = JSON.parse(value);
            this.cart = cartArray.length;
            cartArray[this.cart] = {
                item_id: this.item.item_id,
                item_quantity: this.item.item_cartCounter
            };
            this.storage.set('cart', JSON.stringify(cartArray));
            this.alertSuccess();
        });
    }
};
ItemDetailsPage = tslib_1.__decorate([
    Component({
        selector: 'app-item-details',
        templateUrl: './item-details.page.html',
        styleUrls: ['./item-details.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        SkeeloApiService,
        Storage,
        AlertController,
        Router])
], ItemDetailsPage);
export { ItemDetailsPage };
//# sourceMappingURL=item-details.page.js.map