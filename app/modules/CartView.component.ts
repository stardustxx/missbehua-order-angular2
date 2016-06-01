import {Component, OnInit} from "@angular/core";
import {CartHelperService} from "../services/CartHelper.services";
import {Router} from "@angular/router-deprecated";

@Component({
  selector: "cart-view",
  templateUrl: "./app/modules/Cart-View.html",
  providers: [CartHelperService]
})

export class CartViewComponent implements OnInit {

  cartItems: any;

  constructor() {

  }

  ngOnInit() {
    this.cartItems = CartHelperService.getCartItems();
    console.log("Cart Items", this.cartItems);
  }
}
