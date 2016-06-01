export class CartHelperService {

  static cartItmes: any;

  public static setCartItems(cartItmes: any) {
    CartHelperService.cartItmes = cartItmes;
  }

  public static getCartItems() {
    return CartHelperService.cartItmes;
  }
}
