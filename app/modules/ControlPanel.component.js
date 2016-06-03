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
        this.database = firebase.database();
        this.storage = firebase.storage();
    }
    ControlPanelComponent.prototype.ngOnInit = function () {
        this.firebaseRef = firebase.database().ref("order/all");
    };
    ControlPanelComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.firebaseRef.on("child_added", function (data) {
            _this.addDataInOrder(data);
        });
    };
    ControlPanelComponent.prototype.addDataInOrder = function (order) {
        var date = new Date(order.val().date);
        this.orderArray.push({
            "email": order.val().email,
            "total": order.val().total,
            "date": date
        });
    };
    ControlPanelComponent = __decorate([
        core_1.Component({
            selector: "control-panel",
            templateUrl: "./app/modules/ControlPanel.html"
        }), 
        __metadata('design:paramtypes', [])
    ], ControlPanelComponent);
    return ControlPanelComponent;
}());
exports.ControlPanelComponent = ControlPanelComponent;
//# sourceMappingURL=ControlPanel.component.js.map