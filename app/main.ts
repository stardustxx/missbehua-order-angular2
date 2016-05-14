import {Component} from "@angular/core";
import {ProductListComponent} from "./modules/Product-list.component";

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ProductListComponent]
})

export class BehuaMain {
  constructor() {
    
  }
}