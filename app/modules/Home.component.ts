import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./app/modules/Home.html"
})

export class HomeComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  onProductButtonClicked() {
    this.router.navigate(["/products"]);
  }

  onOrderButtonClicked() {
    this.router.navigate(["/dashboard"]);
  }

}
