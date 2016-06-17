import {Component, OnInit, Input} from "@angular/core";
declare var firebase: any;

@Component({
  selector: "login-signup",
  templateUrl: "./app/modules/LoginSignup.html",
  styleUrls: ["./css/login-signup.css"]
})

export class LoginSignupComponent implements OnInit {

  database: any;

  userInfo: any = {
    "email": "",
    "password": ""
  };

  errorString: string;

  constructor() {
    this.database = firebase.database();
  }

  ngOnInit() {

  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch((error) => {
      if (error.code == "auth/user-not-found") {
        this.signup();
      }
      else {
        this.errorString = error.message;
      }
    });
  }

  signup() {
    this.errorString = null;
    firebase.auth().createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password).catch((error) => {
      this.errorString = error.message;
    });
  }
}
