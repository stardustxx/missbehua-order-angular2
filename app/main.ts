import {Component, OnInit} from "@angular/core";
import {NavBarComponent} from "./modules/NavBar.component";
import {ProductListComponent} from "./modules/ProductList.component";
import {CartViewComponent} from "./modules/CartView.component";
import {LoginSignupComponent} from "./modules/LoginSignup.component";
import {ControlPanelComponent} from "./modules/ControlPanel.component";

declare var firebase: any;

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ProductListComponent, NavBarComponent, LoginSignupComponent, ControlPanelComponent]
})

export class BehuaMain implements OnInit {

  isUserLoggedIn: boolean;

  constructor() {
    this.isUserLoggedIn = false;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.addUserToDatabase(user);
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

  addUserToDatabase(user: any) {
    var processedEmail = user.email.replace(/\./g, ",");
    firebase.database().ref("users/" + processedEmail).on("value", (snapshot) => {
      if (snapshot.val() == null) {
        firebase.database().ref("users/" + processedEmail).set({
          "account_type": 2,
          "email": user.email
        });
      }
    });
  }

}
