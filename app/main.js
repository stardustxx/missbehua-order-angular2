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
var router_1 = require("@angular/router");
var NavBar_component_1 = require("./modules/NavBar.component");
var ProductList_component_1 = require("./modules/ProductList.component");
var CartView_component_1 = require("./modules/CartView.component");
var BehuaMain = (function () {
    function BehuaMain(router) {
        this.router = router;
    }
    BehuaMain.prototype.ngOnInit = function () {
        this.router.navigate(["/products"]);
    };
    BehuaMain = __decorate([
        core_1.Component({
            selector: "behua-main",
            templateUrl: "./app/main.html",
            directives: [router_1.ROUTER_DIRECTIVES, ProductList_component_1.ProductListComponent, NavBar_component_1.NavBarComponent]
        }),
        router_1.Routes([
            {
                path: "/products",
                component: ProductList_component_1.ProductListComponent
            },
            {
                path: "/cart",
                component: CartView_component_1.CartViewComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], BehuaMain);
    return BehuaMain;
}());
exports.BehuaMain = BehuaMain;
//# sourceMappingURL=main.js.map