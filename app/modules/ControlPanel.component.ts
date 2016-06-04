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

  orderDetail:any = {}
  isShowingDetail: boolean = false;

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
      "products": order.val().product,
      "total": order.val().total,
      "date": date
    });
  }

  onViewMoreClicked(item: any) {
    console.log("item", item);
    this.orderDetail["email"] = item.email;
    this.orderDetail["products"] = [];
    this.orderDetail["total"] = item.total;
    this.orderDetail["date"] = item.date;
    var products = item.products;
    for (var prop in products) {
      if (products.hasOwnProperty(prop)) {
        this.orderDetail["products"].push({
          "name": prop,
          "amount": products[prop]
        });
      }
    }
    console.log("list", this.orderDetail);
    this.isShowingDetail = true;
  }

  onBackToOrderClicked() {
    this.isShowingDetail = false;
    this.orderDetail = {};
  }

}
