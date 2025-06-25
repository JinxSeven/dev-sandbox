using System;

namespace HPlusSport.Core.Test;

public interface IShoppingCartManager
{
    public AddToCartResponse AddToCart(AddToCartRequest request);
    public AddToCartItem[] GetCart();
}
