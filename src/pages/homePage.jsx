import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home-page.css'
import NavHero from "../components/header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.restaurants);

  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://fakerestaurantapi.runasp.net/api/Restaurant", {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    })
    .then(res => res.json())
    .then(data => {
        const withImages = data.slice(0,15).map((r, i) => ({
          ...r,
          id: r.restaurantID || i + 1,
          image: `/media/imgs/restaurants/restau-${i+1}.jpg`
        }));
        setRestaurants(withImages);
    });
  }, []);

  const filtered = restaurants.filter(r =>
    r.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWishlist = (restaurant) => {
    if (wishlist.some(r => r.id === restaurant.id)) {
      dispatch(removeFromWishlist(restaurant.id));
    } else {
      dispatch(addToWishlist(restaurant));
    }
  };

  return (
    <>        
        <NavHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />    
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Bienvenue sur FoodieApp</h1>
            <div className="row">
                {filtered.map((r, i) => (
                    <div className="col-md-4 col-sm-6 mb-4" key={i+1}>
                        <div className="card restaurant-card shadow-sm">
                            <div className="card-img-wrapper">
                                <img src={r.image} alt={r.restaurantName} className="card-img-top" />
                                <i
                                    className={`bi ${wishlist.some(item => item.id === r.id) ? "bi-suit-heart-fill favorito" : "bi-suit-heart"}`}
                                    onClick={() => toggleWishlist(r)}
                                ></i>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{r.restaurantName}</h5>
                                <p className="card-text">{r.address}</p>
                                <Link to={`/restaurant/${r.id}`} className="btn btn-gradient w-100">
                                 Voir la liste
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}

export default Home;
