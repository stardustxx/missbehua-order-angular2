import {Component, OnInit} from "@angular/core";
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {ProductListComponent} from "./modules/ProductList.component";
import {CartViewComponent} from "./modules/CartView.component";
import {LoginSignupComponent} from "./modules/LoginSignup.component";
import {ControlPanelComponent} from "./modules/ControlPanel.component";
import {UtilityService} from "./services/Utility.services";

declare var firebase: any;

@Component({
  selector: "behua-main",
  templateUrl: "./app/main.html",
  directives: [ROUTER_DIRECTIVES, LoginSignupComponent, ControlPanelComponent],
  providers: [ROUTER_PROVIDERS, UtilityService],
  styleUrls: ["../css/main.css"]
})

@RouteConfig([
  {
    path: "/products",
    name: "Products",
    component: ProductListComponent,
    useAsDefault: true
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartViewComponent
  },
  {
    path: "/login",
    name: "Login",
    component: LoginSignupComponent
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: ControlPanelComponent
  }
])

export class BehuaMain implements OnInit {

  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.addUserToDatabase(user);
        this.router.navigate(["Products"]);
      }
      else {
        this.router.navigate(["Login"]);
      }
    });
  }

  ngOnInit() {

  }

  addUserToDatabase(user: any) {
    var processedEmail = UtilityService.processEmail(user.email);
    firebase.database().ref("users/" + processedEmail).on("value", (snapshot) => {
      if (snapshot.val() == null) {
        firebase.database().ref("users/" + processedEmail).set({
          "account_type": 2,
          "email": user.email
        });
      }
    });
  }

  signOut() {
    firebase.auth().signOut();
  }

}
