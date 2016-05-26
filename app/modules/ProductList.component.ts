import {Component, OnInit} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";

declare var firebase: any;

@Component({
  selector: "product-list",
  templateUrl: "./app/modules/Product-list.html",
  styleUrls: ["./css/product-list.css"],
  providers: [HTTP_PROVIDERS]
})

export class ProductListComponent implements OnInit {

  productsListURL: string = "../../dist/products.json";
  ignoreList: Array <string> = ["Out", "essential", "MIB"];
  productsArray: Array <any> = [];
  cartContent: any = {};

  firebaseStorage: any;
  firebaseStorageRef: any;

  constructor(private http: Http) {
    this.firebaseStorage = firebase.storage();
    this.firebaseStorageRef = this.firebaseStorage.ref();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    firebase.database().ref("products").on('value', (snapshot) => {
      this.formatProducts(snapshot.val());
    });
  }

  formatProducts(productObj: any) {
    for (var prop in productObj) {
      if (productObj.hasOwnProperty(prop)) {
        var productJson: any = {};
        // Category name
        productJson["name"] = prop;
        productJson["products"] = [];
        // Product Key
        for (var productKey in productObj[prop]) {
          if (productObj[prop].hasOwnProperty(productKey)) {
            // The actual product data
            for (var productProp in productObj[prop][productKey]) {
              if (productObj[prop][productKey].hasOwnProperty(productProp)) {
                var product = productObj[prop][productKey][productProp];
                var singleProduct = {
                  "name": "",
                  "amount": null,
                  "link": "",
                  "error": false
                };
                singleProduct.name = product.name;
                singleProduct.link = product.image;
                productJson.products.push(singleProduct);
              }
            }
          }
        }
        this.productsArray.push(productJson);
      }
    }
  }

  incrementAmount(product: any) {
    this.validateAmount(product);
    if (!product.error) {
      product.amount = product.amount == null ? 0 : product.amount;
      product.amount += 1;
    }
  }

  decrementAmount(product: any) {
    this.validateAmount(product);
    if (!product.error && product.amount >= 1) {
      product.amount = product.amount == null ? 0 : product.amount;
      product.amount -= 1;
    }
  }

  validateAmount(product: any) {
    console.log(product);
    if (isNaN(product.amount)) {
      product.error = true;
    } else {
      product.error = false;
    }
  }

  addToCart(product: any) {
    if (product && product.amount) {
      this.cartContent[product.name] = product.amount;
    }
  }

  isProductAddedToCart(product: any) {
    return this.cartContent.hasOwnProperty(product.name);
  }

  removeFromCart(product: any) {
    if (this.isProductAddedToCart(product)) {
      delete this.cartContent[product.name];
      product.amount = null;
    }
    else {
      return null;
    }
  }

}
