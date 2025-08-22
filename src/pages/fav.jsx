import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../store/wishlistSlice";
import "../style/fav.css";

export default function Fav() {
  const wishlist = useSelector((state) => state.wishlist.restaurants);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container mt-4">
        <h1>Liste Favories Du Restaurants</h1>
        <div className="row">
          {wishlist.length === 0 ? (
            <p>Pas encore de restaurants favoris</p>
          ) : (
            wishlist.map((r) => (
              <div className="col-md-4 mb-3" key={r.id}>
                <div className="card">
                  <i
                    className="bi bi-x-circle-fill remove-icon"
                    style={{ cursor: "pointer", fontSize: "20px", margin: "10px", color: "red" }}
                    onClick={() => dispatch(removeFromWishlist(r.id))}
                  ></i>
                  <img src={r.image} alt={r.restaurantName} className="card-imgs" />
                  <div className="card-body">
                    <h5>{r.restaurantName}</h5>
                    <p>{r.address}</p>
                    <Link to={`/restaurant/${r.id}`} className="btn btn-primary voir-btn">
                      Voir détails
                    </Link>
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
