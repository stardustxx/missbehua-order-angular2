"use strict";
var router_1 = require("@angular/router");
var Home_component_1 = require("./modules/Home.component");
var ProductList_component_1 = require("./modules/ProductList.component");
var CartView_component_1 = require("./modules/CartView.component");
var LoginSignup_component_1 = require("./modules/LoginSignup.component");
var ControlPanel_component_1 = require("./modules/ControlPanel.component");
exports.routes = [
    {
        path: "",
        redirectTo: "/home",
        terminal: true
    },
    {
        path: "home",
        component: Home_component_1.HomeComponent
    },
    {
        path: "products",
        component: ProductList_component_1.ProductListComponent
    },
    {
        path: "cart",
        component: CartView_component_1.CartViewComponent
    },
    {
        path: "login",
        component: LoginSignup_component_1.LoginSignupComponent
    },
    {
        path: "dashboard",
        component: ControlPanel_component_1.ControlPanelComponent
    }
];
exports.BEHUA_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map