using System;
using NUnit.Framework.Legacy;

namespace HPlusSport.Core.Test;

public class ShoppingCartTest
{
    [SetUp]
    public void Setup()
    {

    }

    [Test]
    public void ReturnArticleAddedToCart()
    {
        var item = new AddToCartItem()
        {
            Id = 42,
            Quantity = 5
        };

        var request = new AddToCartRequest()
        {
            Item = item
        };

        var manager = new ShoppingCartManager();

        AddToCartResponse response = manager.AddToCart(request);

        Assert.That(response, Is.Not.Null);
        Assert.That(response.CartItems, Does.Contain(item));
    }

    [Test]
    public void ReturnArticlesAddedToCart()
    {
        var item = new AddToCartItem()
        {
            Id = 42,
            Quantity = 5
        };

        var request = new AddToCartRequest()
        {
            Item = item
        };

        var manager = new ShoppingCartManager();

        AddToCartResponse response = manager.AddToCart(request);

        var item2 = new AddToCartItem()
        {
            Id = 44,
            Quantity = 8
        };

        request = new AddToCartRequest()
        {
            Item = item2
        };

        response = manager.AddToCart(request);

        Assert.That(response, Is.Not.Null);
        Assert.That(response.CartItems, Does.Contain(item));
        Assert.That(response.CartItems, Does.Contain(item2));
    }

    [Test]
    public void ReturnArticlesWithAggregatedQuantitiesWhenSameItemAddedTwice()
    {
        var item = new AddToCartItem()
        {
            Id = 42,
            Quantity = 5
        };

        var request = new AddToCartRequest()
        {
            Item = item
        };

        var manager = new ShoppingCartManager();

        // First add
        AddToCartResponse response = manager.AddToCart(request);

        // Second add with same ID but different quantity
        var itemAgain = new AddToCartItem()
        {
            Id = 42,
            Quantity = 3
        };

        request = new AddToCartRequest()
        {
            Item = itemAgain
        };

        response = manager.AddToCart(request);

        Assert.That(response, Is.Not.Null);

        // Find the item in the cart by ID
        var cartItem = response.CartItems!.FirstOrDefault(ci => ci.Id == 42);
        
        Assert.That(cartItem, Is.Not.Null);
        Assert.That(cartItem.Quantity, Is.EqualTo(8)); // 5 + 3
    }

}
