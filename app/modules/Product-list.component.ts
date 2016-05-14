import {Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";

@Component({
  selector: "product-list",
  templateUrl: "./app/modules/Product-list.html",
  providers: [HTTP_PROVIDERS]
})

export class ProductListComponent {
  constructor(private http: Http) {
    
  }
}