import {Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  selector: "nav-bar",
  templateUrl: "./app/modules/NavBar.html",
  providers: [HTTP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})

export class NavBarComponent {
  constructor(private http: Http) {

  }
}
