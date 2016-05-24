import {Component, OnInit} from "@angular/core";
import {NavBarComponent} from "./modules/NavBar.component";
import {ProductListComponent} from "./modules/ProductList.component";
import {CartViewComponent} from "./modules/CartView.component";
import {LoginSignupComponent} from "./modules/LoginSignup.component";

declare var firebase: any;

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ProductListComponent, NavBarComponent, LoginSignupComponent]
})

export class BehuaMain implements OnInit {

  isUserLoggedIn: boolean;

  constructor() {
    this.isUserLoggedIn = false;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        this.isUserLoggedIn = true;
      }
      else {
        console.log("no user");
        this.isUserLoggedIn = false;
      }
    });
  }

  ngOnInit() {

  }

}
