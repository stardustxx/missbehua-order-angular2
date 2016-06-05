import {Component, OnInit} from "@angular/core";

declare var firebase: any;

@Component({
  selector: "control-panel",
  templateUrl: "./app/modules/ControlPanel.html",
  styleUrls: ["./css/control-panel.css"]
})

export class ControlPanelComponent implements OnInit {

  database: any;
  storage: any;
  orderRef: any;
  productRef: any;
  orderArray: Array<any> = [];
  orderDetail:any = {}
  productArray: Array<any> = [];

  isShowingDetail: boolean = false;
  isShowingProductTable: boolean = false;
  isShowingUser: boolean = false;

  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  ngOnInit() {
    this.orderRef = firebase.database().ref("order/all");
    this.productRef = firebase.database().ref("products");
  }

  ngAfterViewInit(){
    this.orderRef.on("child_added", (data) => {
      this.addDataInOrder(data);
    });

    this.productRef.on("value", (snapshot) => {
      this.formatProductArray(snapshot.val());
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
    this.isShowingDetail = true;
  }

  formatProductArray(result: any) {
    for (var category in result) {
      if (result.hasOwnProperty(category)) {
        var productsCategory = result[category];
        for (var key in productsCategory) {
          for (var obj in productsCategory[key]) {
            var product = productsCategory[key][obj];
            product["category"] = category;
            this.productArray.push(product);
          }
        }
      }
    }
  }

  onBackToOrderClicked() {
    this.isShowingDetail = false;
    this.orderDetail = {};
  }

  onProductTabClicked() {
    this.isShowingProductTable = true;
  }

  onUserTabClicked() {
    this.isShowingUser = true;
  }

}
