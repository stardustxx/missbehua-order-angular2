import {Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";

@Component({
  selector: "product-list",
  templateUrl: "./app/modules/Product-list.html",
  providers: [HTTP_PROVIDERS]
})

export class ProductListComponent {

  productsListURL: string = "../../dist/products.json";
  ignoreList: Array<string> = ["Out"];
  productsArray: Array<any> = [];

  constructor(private http: Http) {
    this.getProducts();
  }

  getProducts() {
    this.http.get(this.productsListURL)
      .map(res => res.json())
      .subscribe(
        products => {
          // console.log(products);
          this.formatProductList(products);
          console.log(this.productsArray);
        },
        error => console.log(error),
        () => console.log("Done grabbing products")
      );
  }

  formatProductList(products: any) {
    for (var prop in products) {
      var isOut = false;
      if (products.hasOwnProperty(prop)) {
        for(var out in this.ignoreList) {
          if (this.ignoreList[out] == prop) {
            isOut = true;
            break;
          }
        }
        if (isOut) {
          continue;
        }
        var productJson: any = {};
        productJson["name"] = prop;
        productJson["products"] = [];
        for (var productProp in products[prop]) {
          if (products[prop].hasOwnProperty(productProp)) {
            productJson.products.push("./Product/" + products[prop][productProp]);
          }
        }
        this.productsArray.push(productJson);
      }
    }
  }
}
