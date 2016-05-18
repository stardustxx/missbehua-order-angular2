import {Component, OnInit} from "@angular/core";
import {Router, Route, Routes, ROUTER_DIRECTIVES} from "@angular/router";
import {NavBarComponent} from "./modules/NavBar.component";
import {ProductListComponent} from "./modules/ProductList.component";
import {CartViewComponent} from "./modules/CartView.component";

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ROUTER_DIRECTIVES, ProductListComponent, NavBarComponent]
})

@Routes([
  {
    path: "/products",
    component: ProductListComponent
  },
  {
    path: "/cart",
    component: CartViewComponent
  }
])

export class BehuaMain implements OnInit{
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(["/products"]);
  }
}
