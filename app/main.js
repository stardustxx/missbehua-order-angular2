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
var NavBar_component_1 = require("./modules/NavBar.component");
var ProductList_component_1 = require("./modules/ProductList.component");
var LoginSignup_component_1 = require("./modules/LoginSignup.component");
var ControlPanel_component_1 = require("./modules/ControlPanel.component");
var BehuaMain = (function () {
    function BehuaMain() {
        var _this = this;
        this.isUserLoggedIn = false;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.addUserToDatabase(user);
                _this.isUserLoggedIn = true;
            }
            else {
                console.log("no user");
                _this.isUserLoggedIn = false;
            }
        });
    }
    BehuaMain.prototype.ngOnInit = function () {
    };
    BehuaMain.prototype.addUserToDatabase = function (user) {
        var processedEmail = user.email.replace(/\./g, ",");
        firebase.database().ref("users/" + processedEmail).on("value", function (snapshot) {
            if (snapshot.val() == null) {
                firebase.database().ref("users/" + processedEmail).set({
                    "account_type": 2,
                    "email": user.email
                });
            }
        });
    };
    BehuaMain = __decorate([
        core_1.Component({
            selector: "behua-main",
            templateUrl: "./app/main.html",
            directives: [ProductList_component_1.ProductListComponent, NavBar_component_1.NavBarComponent, LoginSignup_component_1.LoginSignupComponent, ControlPanel_component_1.ControlPanelComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BehuaMain);
    return BehuaMain;
}());
exports.BehuaMain = BehuaMain;
//# sourceMappingURL=main.js.map