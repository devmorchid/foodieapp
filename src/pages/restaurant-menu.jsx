import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import NavHeroMenu from "../components/header-menu.jsx";

import "../style/menu.css";

export default function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.restaurants);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    fetch(`https://cors-anywhere.herokuapp.com/https://fakerestaurantapi.runasp.net/api/Restaurant/${id}`, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    })
      .then(res => res.json())
      .then(data => setRestaurant(data));

    fetch(`https://cors-anywhere.herokuapp.com/https://fakerestaurantapi.runasp.net/api/Restaurant/${id}/Menu`, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    })
      .then(res => res.json())
      .then(data => setMenu(data));
  }, [id]);

  if (!restaurant) return <p className="text-center mt-5">Chargement du restaurant...</p>;

  const toggleWishlist = (dish) => {
    if (wishlist.some(d => d.id === dish.itemID)) {
      dispatch(removeFromWishlist(dish.itemID));
    } else {
      dispatch(addToWishlist(dish));
    }
  };

  return (
    <>
      <NavHeroMenu/>
      <div className="container mt-4">
        <div className="text-center mb-4">
          <h1 className="display-5">{restaurant.restaurantName}</h1>
          <p className="text-muted">{restaurant.address}</p>
        </div>

        <div className="row">
          {menu.length === 0 ? (
            <p className="text-center">Aucun plat disponible.</p>
          ) : (
            menu.map((dish) => (
              <div key={dish.itemID} className="col-md-4 mb-4">
                <div className="card shadow-sm menu-card h-100 position-relative">
                  
                  {/* Heart wishlist icon */}
                  <i
                    className={`bi bi-suit-heart${wishlist.some(item => item.id === dish.itemID) ? "-fill favorito" : ""}`}
                    style={{ cursor: "pointer", fontSize: "24px", position: "absolute", top: "10px", right: "10px", color: wishlist.some(item => item.id === dish.itemID) ? "red" : "#333" }}
                    onClick={() => toggleWishlist(dish)}
                    title={wishlist.some(item => item.id === dish.itemID) ? "Retirer des favoris" : "Ajouter aux favoris"}
                  ></i>

                  {/* Dish image */}
                  <img
                    src={dish.imageUrl || "/media/imgs/foods/default.jpg"}
                    alt={dish.itemName}
                    className="card-img-top menu-img"
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{dish.itemName}</h5>
                    <p className="card-text text-truncate">{dish.itemDescription}</p>
                    <p className="fw-bold text-success">{dish.itemPrice} MAD</p>

                    <button
                      className={`btn ${cart.some(item => item.id === dish.itemID) ? "btn-success" : "btn-outline-primary"} mt-auto`}
                      onClick={() => dispatch(addToCart({ ...dish, id: dish.itemID }))}
                    >
                      {cart.some(item => item.id === dish.itemID) ? "Ajouté ✅" : "Ajouter au panier"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
