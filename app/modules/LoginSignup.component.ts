import {Component, OnInit} from "@angular/core";
declare var firebase: any;

@Component({
  selector: "login-signup",
  templateUrl: "./app/modules/LoginSignup.html",
  styleUrls: ["./css/login-signup.css"]
})

export class LoginSignupComponent implements OnInit {

  userInfo: any = {
    "email": "",
    "password": ""
  };

  errorString: string;

  constructor() {

  }

  ngOnInit() {

  }

  login() {
    this.errorString = null;
    firebase.auth().signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch((error) => {
      this.errorString = error.message;
    });
  }

  signup() {
    this.errorString = null;
    firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch((error) => {
      this.errorString = error.message;
    })
  }
}
