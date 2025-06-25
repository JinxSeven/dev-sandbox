import React from 'react';
import { NavLink } from "react-router-dom"
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function TopNavigation({ cartCount }) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return ( 
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">React Shop</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <NavLink className={({ isActive }) => isActive? "nav-link active" : "nav-link"} aria-current="page" to={"/"}>Home</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className={({ isActive}) => isActive? "nav-link active" : "nav-link"} to={"/products"}>Products</NavLink>
              </li>
              <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
              </a>
              <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Cart</a></li>
                  <li><a className="dropdown-item" href="#">Wishlist</a></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
              </ul>
              </li>
              <li className="nav-item">
              {/* <a className="nav-link disabled" aria-disabled="true">Disabled</a> */}
              </li>
          </ul>
          <form className="d-flex" role="search">
              <IconButton aria-label="cart" className='me-2 ms-2'>
                <StyledBadge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNavigation;