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
var router_deprecated_1 = require("@angular/router-deprecated");
var ProductList_component_1 = require("./modules/ProductList.component");
var CartView_component_1 = require("./modules/CartView.component");
var LoginSignup_component_1 = require("./modules/LoginSignup.component");
var ControlPanel_component_1 = require("./modules/ControlPanel.component");
var Utility_services_1 = require("./services/Utility.services");
var BehuaMain = (function () {
    function BehuaMain(router) {
        var _this = this;
        this.router = router;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.addUserToDatabase(user);
                _this.router.navigate(["Products"]);
            }
            else {
                _this.router.navigate(["Login"]);
            }
        });
    }
    BehuaMain.prototype.ngOnInit = function () {
    };
    BehuaMain.prototype.addUserToDatabase = function (user) {
        var processedEmail = Utility_services_1.UtilityService.processEmail(user.email);
        firebase.database().ref("users/" + processedEmail).on("value", function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref("users/" + processedEmail).set({
                    "account_type": 2,
                    "email": user.email
                });
            }
        });
    };
    BehuaMain.prototype.signOut = function () {
        firebase.auth().signOut();
    };
    BehuaMain = __decorate([
        core_1.Component({
            selector: "behua-main",
            templateUrl: "./app/main.html",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, LoginSignup_component_1.LoginSignupComponent, ControlPanel_component_1.ControlPanelComponent],
            providers: [router_deprecated_1.ROUTER_PROVIDERS, Utility_services_1.UtilityService],
            styleUrls: ["../css/main.css"]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: "/products",
                name: "Products",
                component: ProductList_component_1.ProductListComponent,
                useAsDefault: true
            },
            {
                path: "/cart",
                name: "Cart",
                component: CartView_component_1.CartViewComponent
            },
            {
                path: "/login",
                name: "Login",
                component: LoginSignup_component_1.LoginSignupComponent
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                component: ControlPanel_component_1.ControlPanelComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], BehuaMain);
    return BehuaMain;
}());
exports.BehuaMain = BehuaMain;
//# sourceMappingURL=main.js.map