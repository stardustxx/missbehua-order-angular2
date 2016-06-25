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
var Utility_services_1 = require("./services/Utility.services");
var BehuaMain = (function () {
    function BehuaMain(router) {
        var _this = this;
        this.router = router;
        this.isLoggedIn = false;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.validateUser(user);
            }
            else {
                _this.router.navigate(["/login"]);
                _this.isLoggedIn = false;
            }
        });
    }
    BehuaMain.prototype.ngOnInit = function () {
    };
    BehuaMain.prototype.validateUser = function (user) {
        var _this = this;
        var processedEmail = Utility_services_1.UtilityService.processEmail(user.email);
        firebase.database().ref("users").child(processedEmail).on("value", function (snapshot) {
            if (snapshot.val() != null) {
                _this.router.navigate(["/home"]);
                _this.isLoggedIn = true;
            }
            else {
                _this.signOut();
            }
        });
    };
    // addUserToDatabase(user: any) {
    //   var processedEmail = UtilityService.processEmail(user.email);
    //   firebase.database().ref("users/" + processedEmail).on("value", (snapshot) => {
    //     if (snapshot.val() == null) {
    //       firebase.database().ref("users/" + processedEmail).set({
    //         "account_type": 2,
    //         "email": user.email,
    //         "enabled": true
    //       });
    //     }
    //   });
    // }
    BehuaMain.prototype.signOut = function () {
        firebase.auth().signOut();
    };
    BehuaMain = __decorate([
        core_1.Component({
            selector: "behua-main",
            templateUrl: "./app/main.html",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [Utility_services_1.UtilityService],
            styleUrls: ["../css/main.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], BehuaMain);
    return BehuaMain;
}());
exports.BehuaMain = BehuaMain;
//# sourceMappingURL=main.js.map