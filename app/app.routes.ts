import {provideRouter, RouterConfig} from "@angular/router";
import {HomeComponent} from "./modules/Home.component";
import {ProductListComponent} from "./modules/ProductList.component";
import {CartViewComponent} from "./modules/CartView.component";
import {LoginSignupComponent} from "./modules/LoginSignup.component";
import {ControlPanelComponent} from "./modules/ControlPanel.component";

export const routes: RouterConfig = [
  {
    path: "",
    redirectTo: "/home",
    terminal: true
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductListComponent
  },
  {
    path: "cart",
    component: CartViewComponent
  },
  {
    path: "login",
    component: LoginSignupComponent
  },
  {
    path: "dashboard",
    component: ControlPanelComponent
  }
]

export const BEHUA_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
