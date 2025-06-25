using System;

namespace HPlusSport.Core.Test;

public class ShoppingCartManager: IShoppingCartManager
{
    private List<AddToCartItem> _cartList { get; set; }

    public ShoppingCartManager()
    {
        _cartList = new List<AddToCartItem>();
    }

    public AddToCartResponse AddToCart(AddToCartRequest request)
    {
        int indx = _cartList.FindIndex(item => item.Id == request.Item!.Id);
        if (indx != -1)
        {
            _cartList[indx].Quantity += request.Item!.Quantity;
        }
        else _cartList.Add(request.Item!);

        return new AddToCartResponse()
        {
            CartItems = _cartList.ToArray()
        };
    }

    public AddToCartItem[] GetCart()
    {
        return _cartList.ToArray();
    }
}
