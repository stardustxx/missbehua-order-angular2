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
var ControlPanelComponent = (function () {
    function ControlPanelComponent() {
        this.orderArray = [];
        this.orderDetail = {};
        this.productArray = [];
        this.categoryArray = [];
        this.userArray = [];
        this.tabProductTitle = "Product Table";
        this.selectedProductToDelete = null;
        this.isShowingOrderDetail = false;
        this.isShowingProductTable = false;
        this.isAddingNewProduct = false;
        this.isShowingUser = false;
        this.database = firebase.database();
        this.storage = firebase.storage();
    }
    ControlPanelComponent.prototype.ngOnInit = function () {
        this.orderRef = this.database.ref("order/all");
        this.productRef = this.database.ref("products");
        this.userRef = this.database.ref("users");
    };
    ControlPanelComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.orderRef.on("child_added", function (data) {
            _this.addDataInOrder(data);
        });
        this.productRef.on("value", function (snapshot) {
            _this.formatProductArray(snapshot.val());
        });
        this.userRef.on("child_added", function (data) {
            _this.userArray.push(data.val());
        });
    };
    ControlPanelComponent.prototype.addDataInOrder = function (order) {
        var date = new Date(order.val().date);
        this.orderArray.push({
            "email": order.val().email,
            "products": order.val().product,
            "total": order.val().total,
            "date": date
        });
    };
    ControlPanelComponent.prototype.onViewMoreClicked = function (item) {
        this.orderDetail["email"] = item.email;
        this.orderDetail["products"] = [];
        this.orderDetail["total"] = item.total;
        this.orderDetail["date"] = item.date;
        var products = item.products;
        for (var prop in products) {
            if (products.hasOwnProperty(prop)) {
                this.orderDetail["products"].push({
                    "name": prop,
                    "amount": products[prop]
                });
            }
        }
        this.isShowingOrderDetail = true;
    };
    ControlPanelComponent.prototype.formatProductArray = function (result) {
        for (var category in result) {
            this.categoryArray.push(category);
            if (result.hasOwnProperty(category)) {
                var productsCategory = result[category];
                for (var key in productsCategory) {
                    for (var obj in productsCategory[key]) {
                        var product = productsCategory[key][obj];
                        product["category"] = category;
                        product["key"] = key;
                        this.productArray.push(product);
                    }
                }
            }
        }
    };
    ControlPanelComponent.prototype.onBackToOrderClicked = function () {
        this.isShowingOrderDetail = false;
        this.orderDetail = {};
    };
    ControlPanelComponent.prototype.onProductTabClicked = function () {
        this.isShowingProductTable = true;
    };
    ControlPanelComponent.prototype.onUserTabClicked = function () {
        this.isShowingUser = true;
    };
    ControlPanelComponent.prototype.onBackInProductClicked = function () {
        this.isAddingNewProduct = false;
        this.tabProductTitle = "Product Table";
    };
    ControlPanelComponent.prototype.onAddNewProductClicked = function () {
        this.isAddingNewProduct = true;
        this.tabProductTitle = "新增產品";
    };
    ControlPanelComponent.prototype.onDeleteProductClicked = function (item) {
        this.selectedProductToDelete = item;
    };
    ControlPanelComponent.prototype.confirmDeleteProduct = function () {
        if (this.selectedProductToDelete) {
            firebase.database().ref(this.selectedProductToDelete.category).child(this.selectedProductToDelete.key).remove();
        }
    };
    ControlPanelComponent = __decorate([
        core_1.Component({
            selector: "control-panel",
            templateUrl: "./app/modules/ControlPanel.html",
            styleUrls: ["./css/control-panel.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], ControlPanelComponent);
    return ControlPanelComponent;
}());
exports.ControlPanelComponent = ControlPanelComponent;
//# sourceMappingURL=ControlPanel.component.js.map