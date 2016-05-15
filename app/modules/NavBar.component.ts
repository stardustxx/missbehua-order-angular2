import {Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";

@Component({
  selector: "nav-bar",
  templateUrl: "./app/modules/NavBar.html",
  providers: [HTTP_PROVIDERS]
})

export class NavBarComponent {
  constructor(private http: Http) {

  }
}
