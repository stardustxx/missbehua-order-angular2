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
var LoginSignupComponent = (function () {
    function LoginSignupComponent() {
        this.userInfo = {
            "email": "",
            "password": ""
        };
        if (this.islogin == undefined) {
            this.islogin = true;
        }
    }
    LoginSignupComponent.prototype.ngOnInit = function () {
    };
    LoginSignupComponent.prototype.login = function () {
        var _this = this;
        this.errorString = null;
        firebase.auth().signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch(function (error) {
            _this.errorString = error.message;
        });
    };
    LoginSignupComponent.prototype.signup = function () {
        var _this = this;
        this.errorString = null;
        firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch(function (error) {
            _this.errorString = error.message;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LoginSignupComponent.prototype, "islogin", void 0);
    LoginSignupComponent = __decorate([
        core_1.Component({
            selector: "login-signup",
            templateUrl: "./app/modules/LoginSignup.html",
            styleUrls: ["./css/login-signup.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginSignupComponent);
    return LoginSignupComponent;
}());
exports.LoginSignupComponent = LoginSignupComponent;
//# sourceMappingURL=LoginSignup.component.js.map