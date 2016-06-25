"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var CartHelper_services_1 = require("../services/CartHelper.services");
var router_1 = require("@angular/router");
var Utility_services_1 = require("../services/Utility.services");
var CartViewComponent = (function () {
    function CartViewComponent(router) {
        this.router = router;
        this.cartItemsArray = [];
        this.itemTotal = 0;
    }
    CartViewComponent.prototype.ngOnInit = function () {
        this.currentUser = firebase.auth().currentUser;
    };
    CartViewComponent.prototype.ngAfterViewInit = function () {
        this.cartItems = CartHelper_services_1.CartHelperService.getCartItems();
        for (var prop in this.cartItems) {
            if (this.cartItems.hasOwnProperty(prop)) {
                var item = {
                    "name": prop,
                    "amount": this.cartItems[prop]
                };
                this.cartItemsArray.push(item);
                this.itemTotal += parseInt(item.amount);
            }
        }
        this.cartItemsArray.push({
            "name": "總數",
            "amount": this.itemTotal
        });
    };
    CartViewComponent.prototype.onSubmitOrderClicked = function () {
        var processedEmail = Utility_services_1.UtilityService.processEmail(this.currentUser.email);
        var newKey = firebase.database().ref("order/admin").push().key;
        var date = new Date();
        var clientOrder = {
            "product": this.cartItems,
            "total": this.itemTotal,
            "date": date.getTime()
        };
        firebase.database().ref("order").child("admin").child(processedEmail).child(newKey).set(clientOrder);
        firebase.database().ref("order").child(processedEmail).child(newKey).set(clientOrder);
        clientOrder["email"] = this.currentUser.email;
        firebase.database().ref("order/all").child(newKey).set(clientOrder);
        this.router.navigate(["/products"]);
    };
    CartViewComponent = __decorate([
        core_1.Component({
            selector: "cart-view",
            templateUrl: "./app/modules/Cart-View.html",
            providers: [CartHelper_services_1.CartHelperService, Utility_services_1.UtilityService]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CartViewComponent);
    return CartViewComponent;
}());
exports.CartViewComponent = CartViewComponent;
//# sourceMappingURL=CartView.component.js.map