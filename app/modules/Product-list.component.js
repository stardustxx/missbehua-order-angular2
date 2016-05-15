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
var http_1 = require("@angular/http");
var ProductListComponent = (function () {
    function ProductListComponent(http) {
        this.http = http;
        this.productsListURL = "../../dist/products.json";
        this.ignoreList = ["Out"];
        this.productsArray = [];
        this.getProducts();
    }
    ProductListComponent.prototype.getProducts = function () {
        var _this = this;
        this.http.get(this.productsListURL)
            .map(function (res) { return res.json(); })
            .subscribe(function (products) {
            // console.log(products);
            _this.formatProductList(products);
            console.log(_this.productsArray);
        }, function (error) { return console.log(error); }, function () { return console.log("Done grabbing products"); });
    };
    ProductListComponent.prototype.formatProductList = function (products) {
        for (var prop in products) {
            var isOut = false;
            if (products.hasOwnProperty(prop)) {
                for (var out in this.ignoreList) {
                    if (this.ignoreList[out] == prop) {
                        isOut = true;
                        break;
                    }
                }
                if (isOut) {
                    continue;
                }
                var productJson = {};
                productJson["name"] = prop;
                productJson["products"] = [];
                for (var productProp in products[prop]) {
                    if (products[prop].hasOwnProperty(productProp)) {
                        productJson.products.push("./Product/" + products[prop][productProp]);
                    }
                }
                this.productsArray.push(productJson);
            }
        }
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: "product-list",
            templateUrl: "./app/modules/Product-list.html",
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=Product-list.component.js.map