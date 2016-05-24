import {Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";

declare var firebase: any;

@Component({
  selector: "nav-bar",
  templateUrl: "./app/modules/NavBar.html",
  providers: [HTTP_PROVIDERS]
})

export class NavBarComponent {
  constructor(private http: Http) {

  }

  signOut() {
    firebase.auth().signOut();
  }
}
