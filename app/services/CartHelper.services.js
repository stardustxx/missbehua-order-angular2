"use strict";
var CartHelperService = (function () {
    function CartHelperService() {
    }
    CartHelperService.setCartItems = function (cartItmes) {
        CartHelperService.cartItmes = cartItmes;
    };
    CartHelperService.getCartItems = function () {
        return CartHelperService.cartItmes;
    };
    return CartHelperService;
}());
exports.CartHelperService = CartHelperService;
//# sourceMappingURL=CartHelper.services.js.map