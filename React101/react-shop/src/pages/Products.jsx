import React, { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartManager";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { toggleWishlistItem } from "../features/wishlist/wishlistManager";

function Products() {
  const [products, setProducts] = useState([{}])

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch('https://fakestoreapi.com/products').then((result) => {
        result.json().then(prods => {
          setProducts(prods);
          console.log(prods);
        });
      }).catch((err) => {
        console.error(err);
      });
    }

    fetchProducts();
  }, [])

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const wishlistedItems = useSelector(state => state.wishlist.wishlistedItems)

  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
  }

  const handleToggleWishlistItem = (prod) => {
    console.log(`Click registered`);
    dispatch(toggleWishlistItem(prod));
  }

  useEffect(() => {
    console.log(`Items in cart: `, cartItems);
    console.log(`Items in wishlist: `, wishlistedItems);
  }, [cartItems, wishlistedItems])
  
  return (
    <>
      <div className="row p-3">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {products.map(prod => (
            <div key={prod.id} className="card" style={{ width: '21.65rem', height: '19rem', maxHeight: '19rem', overflow: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{prod.title}</h5>
                <p className="card-text" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{prod.description}</p>
                <Typography component="legend">Rating</Typography>
                <Stack direction="row" spacing={1} className="m-2">
                  <Rating name="read-only" value={prod.rating?.rate} readOnly />
                  <span>({prod.rating?.count})</span>
                  {
                    wishlistedItems.includes(prod) ? 
                    (<FavoriteRoundedIcon onClick={() => handleToggleWishlistItem(prod)}/>) : (<FavoriteBorderRoundedIcon onClick={() => handleToggleWishlistItem(prod)}/>)
                  }
                </Stack>
                <Stack direction="row" spacing={1}>
                  <a className="btn btn-primary">${prod.price}</a>
                  <a className="btn btn-primary" onClick={() => handleAddToCart(prod)}>Add To Cart</a>
                </Stack>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
