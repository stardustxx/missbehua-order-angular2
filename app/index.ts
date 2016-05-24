import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {LocationStrategy, PathLocationStrategy, HashLocationStrategy} from "@angular/common";
import {BehuaMain} from "./main";
import "rxjs/Rx";

bootstrap(BehuaMain);

// bootstrap(BehuaMain, [
//   ROUTER_PROVIDERS,
//   provide(LocationStrategy, {
//     useClass: HashLocationStrategy
//   })
// ]);
