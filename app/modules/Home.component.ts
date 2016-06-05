import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";

@Component({
  selector: "home",
  templateUrl: "./app/modules/Home.html"
})

export class HomeComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  onProductButtonClicked() {
    this.router.navigate(["Products"]);
  }

  onOrderButtonClicked() {
    this.router.navigate(["Dashboard"]);
  }

}
