import {Component, OnInit, Input} from "@angular/core";
declare var firebase: any;

@Component({
  selector: "login-signup",
  templateUrl: "./app/modules/LoginSignup.html",
  styleUrls: ["./css/login-signup.css"]
})

export class LoginSignupComponent implements OnInit {

  @Input() islogin: boolean;

  userInfo: any = {
    "email": "",
    "password": ""
  };

  errorString: string;

  constructor() {
    if (this.islogin == undefined) {
      this.islogin = true;
    }
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
