import {Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";

declare var firebase: any;

@Component({
  selector: "nav-bar",
  templateUrl: "./app/modules/NavBar.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS],
  styleUrls: ["../../css/nav-bar.css"]
})

export class NavBarComponent {
  constructor(private http: Http) {

  }

  signOut() {
    firebase.auth().signOut();
  }
}
