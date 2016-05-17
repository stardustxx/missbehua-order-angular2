import {
  Component
} from "@angular/core";
import {
  Http,
  HTTP_PROVIDERS
} from "@angular/http";

@Component({
  selector: "product-list",
  templateUrl: "./app/modules/Product-list.html",
  styleUrls: ["./styles/css/product-list.css"],
  providers: [HTTP_PROVIDERS]
})

export class ProductListComponent {

  productsListURL: string = "../../dist/products.json";
  ignoreList: Array <string> = ["Out", "essential", "MIB"];
  productsArray: Array <any> = [];
  cartContent: any = {};

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

  /**
   * Format product directory json into workable json
   */
  formatProductList(products: any) {
    for (var prop in products) {
      var isOut = false;
      if (products.hasOwnProperty(prop)) {
        for (var out in this.ignoreList) {
          if (this.ignoreList[out] == prop) {
            isOut = true;
            break;
          }
        }
        if (isOut) {
          continue;
        }
        var productJson: any = {};
        // Category name
        productJson["name"] = prop;
        productJson["products"] = [];
        for (var productProp in products[prop]) {
          if (products[prop].hasOwnProperty(productProp)) {
            var singleProduct = {
              "name": "",
              "amount": null,
              "link": "",
              "error": false
            };
            singleProduct.name = productProp.substr(0, productProp.length - 4);
            singleProduct.link = "./Product/" + products[prop][productProp];
            productJson.products.push(singleProduct);
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
    if (product) {
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
