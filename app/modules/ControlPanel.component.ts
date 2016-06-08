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
  userRef: any;
  orderArray: Array<any> = [];
  orderDetail:any = {}
  productArray: Array<any> = [];
  categoryArray: Array<string> = [];
  userArray: Array<any> = [];

  tabProductTitle: string = "Product Table";

  isShowingOrderDetail: boolean = false;
  isShowingProductTable: boolean = false;
  isAddingNewProduct: boolean = false;
  isShowingUser: boolean = false;

  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  ngOnInit() {
    this.orderRef = this.database.ref("order/all");
    this.productRef = this.database.ref("products");
    this.userRef = this.database.ref("users");
  }

  ngAfterViewInit(){
    this.orderRef.on("child_added", (data) => {
      this.addDataInOrder(data);
    });

    this.productRef.on("value", (snapshot) => {
      this.formatProductArray(snapshot.val());
    });

    this.userRef.on("child_added", (data) => {
      this.userArray.push(data.val());
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
    this.isShowingOrderDetail = true;
  }

  formatProductArray(result: any) {
    for (var category in result) {
      this.categoryArray.push(category);
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
    this.isShowingOrderDetail = false;
    this.orderDetail = {};
  }

  onProductTabClicked() {
    this.isShowingProductTable = true;
  }

  onUserTabClicked() {
    this.isShowingUser = true;
  }

  onBackInProductClicked() {
    this.isAddingNewProduct = false;
    this.tabProductTitle = "Product Table";
  }

  onAddNewProductClicked() {
    this.isAddingNewProduct = true;
    this.tabProductTitle = "新增產品"
  }

}
