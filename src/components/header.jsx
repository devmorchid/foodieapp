import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart, clearCart } from "../store/cartSlice";
import '../style/header.css';

export default function NavHero({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  return (
    <>
      {/* Navbar fixée en haut */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-3 shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
            <span className="logo-icon me-2">🍔</span> FoodApp
          </a>

          <form className="d-flex mx-auto my-2 w-50">
          <input
  className="form-control search-input"
  type="search"
  placeholder="Rechercher un plat ou un restaurant..."
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
  style={{ color: "black", backgroundColor: "white" }}
/>

          </form>

          <i className="bi bi-cart-fill icon-btn" data-bs-toggle="offcanvas" data-bs-target="#sidePanel"></i>
        </div>
      </nav>

      {/* Décalage pour que le contenu ne soit pas caché derrière la navbar */}
      <div style={{ height: "80px" }}></div>

      {/* Offcanvas pour le panier */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="sidePanel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Mon Panier</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {cartItems.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.itemID} className="d-flex align-items-center mb-3 border-bottom pb-2">
                <img 
                  src={item.imageUrl} 
                  alt={item.itemName} 
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "10px" }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.itemName}</h6>
                  <p className="mb-0 text-muted">Quantité: {item.quantity}</p>
                </div>
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => dispatch(addToCart({ ...item, quantity: -1 }))}
                  >-</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                  >+</button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch(removeFromCart(item.itemID))}
                  >🗑</button>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <button 
              className="btn btn-danger w-100 mt-3"
              onClick={() => dispatch(clearCart())}
            >
              Vider le panier
            </button>
          )}
        </div>
      </div>
    </>
  );
}
