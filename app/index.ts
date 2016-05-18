import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {ROUTER_PROVIDERS} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {BehuaMain} from "./main";
import "rxjs/Rx";

bootstrap(BehuaMain, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {
    useClass: HashLocationStrategy
  })
]);
