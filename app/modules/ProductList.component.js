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
var router_deprecated_1 = require("@angular/router-deprecated");
var CartHelper_services_1 = require("../services/CartHelper.services");
var ProductListComponent = (function () {
    function ProductListComponent(http, router) {
        this.http = http;
        this.router = router;
        this.productsListURL = "../../dist/products.json";
        this.ignoreList = ["Out", "essential", "MIB"];
        this.productsArray = [];
        this.cartContent = {};
        this.firebaseStorage = firebase.storage();
        this.firebaseStorageRef = this.firebaseStorage.ref();
    }
    ProductListComponent.prototype.ngOnInit = function () {
    };
    ProductListComponent.prototype.ngAfterViewInit = function () {
        this.getProducts();
    };
    ProductListComponent.prototype.getProducts = function () {
        var _this = this;
        firebase.database().ref("products").on('value', function (snapshot) {
            _this.formatProducts(snapshot.val());
        });
    };
    ProductListComponent.prototype.formatProducts = function (productObj) {
        for (var prop in productObj) {
            if (productObj.hasOwnProperty(prop)) {
                var productJson = {};
                // Category name
                productJson["name"] = prop;
                productJson["products"] = [];
                // Product Key
                for (var productKey in productObj[prop]) {
                    if (productObj[prop].hasOwnProperty(productKey)) {
                        // The actual product data
                        for (var productProp in productObj[prop][productKey]) {
                            if (productObj[prop][productKey].hasOwnProperty(productProp)) {
                                var product = productObj[prop][productKey][productProp];
                                var singleProduct = {
                                    "name": "",
                                    "amount": null,
                                    "link": "",
                                    "error": false
                                };
                                singleProduct.name = product.name;
                                singleProduct.link = product.image;
                                productJson.products.push(singleProduct);
                            }
                        }
                    }
                }
                this.productsArray.push(productJson);
            }
        }
    };
    ProductListComponent.prototype.incrementAmount = function (product) {
        this.validateAmount(product);
        if (!product.error) {
            product.amount = product.amount == null ? 0 : product.amount;
            product.amount += 1;
        }
    };
    ProductListComponent.prototype.decrementAmount = function (product) {
        this.validateAmount(product);
        if (!product.error && product.amount >= 1) {
            product.amount = product.amount == null ? 0 : product.amount;
            product.amount -= 1;
        }
    };
    ProductListComponent.prototype.validateAmount = function (product) {
        console.log(product);
        if (isNaN(product.amount)) {
            product.error = true;
        }
        else {
            product.error = false;
        }
    };
    ProductListComponent.prototype.addToCart = function (product) {
        if (product && product.amount) {
            this.cartContent[product.name] = product.amount;
        }
    };
    ProductListComponent.prototype.isProductAddedToCart = function (product) {
        return this.cartContent.hasOwnProperty(product.name);
    };
    ProductListComponent.prototype.removeFromCart = function (product) {
        if (this.isProductAddedToCart(product)) {
            delete this.cartContent[product.name];
            product.amount = null;
        }
        else {
            return null;
        }
    };
    ProductListComponent.prototype.onSubmitClicked = function () {
        CartHelper_services_1.CartHelperService.setCartItems(this.cartContent);
        this.router.navigate(["Cart"]);
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: "product-list",
            templateUrl: "./app/modules/Product-list.html",
            styleUrls: ["./css/product-list.css"],
            providers: [http_1.HTTP_PROVIDERS, CartHelper_services_1.CartHelperService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=ProductList.component.js.map