import {Component, OnInit} from "@angular/core";
import {Router, Route, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from "@angular/router";
import {ProductListComponent} from "./modules/Product-list.component";
import {NavBarComponent} from "./modules/NavBar.component";

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ROUTER_DIRECTIVES, ProductListComponent, NavBarComponent],
  providers: [ROUTER_PROVIDERS]
})

@Routes([
  {
    path: "/products",
    component: ProductListComponent
  }
])

export class BehuaMain implements OnInit{
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(["/products"]);
  }
}
