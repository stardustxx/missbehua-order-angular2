import {Component, OnInit} from "@angular/core";
import {CartHelperService} from "../services/CartHelper.services";
import {Router} from "@angular/router-deprecated";
import {UtilityService} from "../services/Utility.services";

declare var firebase: any;

@Component({
  selector: "cart-view",
  templateUrl: "./app/modules/Cart-View.html",
  providers: [CartHelperService, UtilityService]
})

export class CartViewComponent implements OnInit {

  cartItems: any;
  cartItemsArray: Array<any> = [];
  itemTotal: number = 0;
  currentUser: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.currentUser = firebase.auth().currentUser;
  }

  ngAfterViewInit() {
    this.cartItems = CartHelperService.getCartItems();
    for (var prop in this.cartItems) {
      if (this.cartItems.hasOwnProperty(prop)) {
        var item = {
          "name": prop,
          "amount": this.cartItems[prop]
        };
        this.cartItemsArray.push(item);
        this.itemTotal += parseInt(item.amount);
      }
    }
    this.cartItemsArray.push({
      "name": "總數",
      "amount": this.itemTotal
    });
  }

  onSubmitOrderClicked() {
    var processedEmail = UtilityService.processEmail(this.currentUser.email);
    var newKey = firebase.database().ref("order/admin").push().key;

    var clientOrder = {
      "product": this.cartItems,
      "total": this.itemTotal
    };

    firebase.database().ref("order").child("admin").child(processedEmail).child(newKey).set(clientOrder);
    firebase.database().ref("order").child(processedEmail).child(newKey).set(clientOrder);

    this.router.navigate(["Products"]);
  }
}
