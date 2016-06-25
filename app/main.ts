import {Component, OnInit} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {HomeComponent} from "./modules/Home.component";
import {ProductListComponent} from "./modules/ProductList.component";
import {CartViewComponent} from "./modules/CartView.component";
import {LoginSignupComponent} from "./modules/LoginSignup.component";
import {ControlPanelComponent} from "./modules/ControlPanel.component";
import {UtilityService} from "./services/Utility.services";

declare var firebase: any;

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [UtilityService],
  styleUrls: ["../css/main.css"]
})

export class BehuaMain implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.validateUser(user);
      }
      else {
        this.router.navigate(["/login"]);
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit() {

  }

  validateUser(user: any) {
    var processedEmail = UtilityService.processEmail(user.email);
    firebase.database().ref("users").child(processedEmail).on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.router.navigate(["/home"]);
        this.isLoggedIn = true;
      }
      else {
        this.signOut();
      }
    });
  }

  // addUserToDatabase(user: any) {
  //   var processedEmail = UtilityService.processEmail(user.email);
  //   firebase.database().ref("users/" + processedEmail).on("value", (snapshot) => {
  //     if (snapshot.val() == null) {
  //       firebase.database().ref("users/" + processedEmail).set({
  //         "account_type": 2,
  //         "email": user.email,
  //         "enabled": true
  //       });
  //     }
  //   });
  // }

  signOut() {
    firebase.auth().signOut();
  }

}
