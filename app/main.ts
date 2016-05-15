import {Component} from "@angular/core";
import {ProductListComponent} from "./modules/Product-list.component";
import {NavBarComponent} from "./modules/NavBar.component";

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ProductListComponent, NavBarComponent]
})

export class BehuaMain {
  constructor() {
    
  }
}
