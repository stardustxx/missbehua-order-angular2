"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var main_1 = require("./main");
require("rxjs/Rx");
platform_browser_dynamic_1.bootstrap(main_1.BehuaMain, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, {
        useClass: common_1.HashLocationStrategy
    })
]);
//# sourceMappingURL=index.js.map