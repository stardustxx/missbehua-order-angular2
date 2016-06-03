import {Component, OnInit} from "@angular/core";

declare var firebase: any;

@Component({
  selector: "control-panel",
  templateUrl: "./app/modules/ControlPanel.html"
})

export class ControlPanelComponent implements OnInit {

  database: any;
  storage: any;
  firebaseRef: any;
  orderArray: Array<any> = [];

  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  ngOnInit() {
    this.firebaseRef = firebase.database().ref("order/all");
  }

  ngAfterViewInit(){
    this.firebaseRef.on("child_added", (data) => {
      this.addDataInOrder(data);
    });
  }

  addDataInOrder(order: any) {
    var date = new Date(order.val().date);
    this.orderArray.push({
      "email": order.val().email,
      "total": order.val().total,
      "date": date
    });
  }

}
