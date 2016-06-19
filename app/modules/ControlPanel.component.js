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
var LoginSignup_component_1 = require("./LoginSignup.component");
var Utility_services_1 = require("../services/Utility.services");
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
        this.selectedUserToDelete = null;
        // New Product Form
        this.productName = "";
        this.newCategory = "";
        this.selectedCategory = "";
        // User
        this.newEmail = "";
        this.database = firebase.database();
        this.storage = firebase.storage();
    }
    ControlPanelComponent.prototype.ngOnInit = function () {
        this.orderRef = this.database.ref("order/all");
        this.productRef = this.database.ref("products");
        this.userRef = this.database.ref("users");
    };
    ControlPanelComponent.prototype.ngAfterViewInit = function () {
        this.getOrder();
        this.getProduct();
        this.getUser();
    };
    ControlPanelComponent.prototype.getOrder = function () {
        var _this = this;
        this.orderRef.on("child_added", function (data) {
            _this.addDataInOrder(data);
        });
    };
    ControlPanelComponent.prototype.getProduct = function () {
        var _this = this;
        this.productArray = [];
        this.productRef.on("value", function (snapshot) {
            _this.formatProductArray(snapshot.val());
        });
    };
    ControlPanelComponent.prototype.getUser = function () {
        var _this = this;
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
    ControlPanelComponent.prototype.onToggleEnabledClicked = function (item) {
        item.enabled = !item.enabled;
        var obj = {
            "enabled": item.enabled,
            "image": item.image,
            "name": item.name
        };
        this.productRef.child(item.category).child(item.key).child(item.name).set(obj);
    };
    ControlPanelComponent.prototype.onDeleteProductClicked = function (item) {
        this.selectedProductToDelete = item;
    };
    ControlPanelComponent.prototype.confirmDeleteProduct = function () {
        if (this.selectedProductToDelete) {
            firebase.database().ref("products").child(this.selectedProductToDelete.category).child(this.selectedProductToDelete.key).set(null);
            this.getProduct();
        }
    };
    ControlPanelComponent.prototype.resetNewCategory = function () {
        this.newCategory = "";
    };
    ControlPanelComponent.prototype.onSubmitNewProductClicked = function () {
        var _this = this;
        // Check File
        var file = document.getElementById("inputImageFile").files[0];
        var category;
        if (file) {
            var fileRef;
            if (this.newCategory) {
                fileRef = this.storage.ref().child("products").child(this.newCategory + "/" + file.name);
                category = this.newCategory;
            }
            else if (this.selectedCategory) {
                fileRef = this.storage.ref().child("products").child(this.selectedCategory + "/" + file.name);
                category = this.selectedCategory;
            }
            else {
                return;
            }
            this.fileUpload = fileRef.put(file);
            this.fileUpload.on("state_changed", function (snapshot) {
            }, function (error) {
                console.log(error);
            }, function () {
                var imageUrl = _this.fileUpload.snapshot.downloadURL;
                var obj = {
                    "name": _this.productName,
                    "image": imageUrl,
                    "enabled": true
                };
                _this.productRef.child(category).push().child(_this.productName).set(obj);
                _this.productName = "";
            });
        }
    };
    ControlPanelComponent.prototype.onAddingEmailClicked = function () {
        var _this = this;
        if (this.newEmail) {
            var processedEmail = Utility_services_1.UtilityService.processEmail(this.newEmail);
            this.userRef.child(processedEmail).on("value", function (snapshot) {
                console.log("snap", snapshot.val());
                if (snapshot.val() == null) {
                    firebase.database().ref("users/" + processedEmail).set({
                        "account_type": 2,
                        "email": _this.newEmail,
                        "enabled": true
                    });
                    _this.newEmail = "";
                }
            });
        }
    };
    ControlPanelComponent.prototype.onDeleteUserClicked = function (user) {
        this.selectedUserToDelete = user;
    };
    ControlPanelComponent.prototype.onConfirmDeleteUser = function () {
        var processedEmail = Utility_services_1.UtilityService.processEmail(this.selectedUserToDelete.email);
        this.userRef.child(processedEmail).set(null);
        this.getUser();
    };
    ControlPanelComponent = __decorate([
        core_1.Component({
            selector: "control-panel",
            templateUrl: "./app/modules/ControlPanel.html",
            styleUrls: ["./css/control-panel.css"],
            directives: [LoginSignup_component_1.LoginSignupComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ControlPanelComponent);
    return ControlPanelComponent;
}());
exports.ControlPanelComponent = ControlPanelComponent;
//# sourceMappingURL=ControlPanel.component.js.map