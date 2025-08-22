import React from "react"
import '../style/header.css'

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";


export default function NavHeroMenu({ searchTerm, setSearchTerm }){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    return(
        <>
            <nav class="navbar py-3">
                <div class="container">
                    <a class="navbar-brand fw-bold" href="#">FoodApp</a>
                    <i class="bi bi-cart-fill icon-btn" data-bs-toggle="offcanvas" data-bs-target="#sidePanel"></i>
                </div>
            </nav>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="sidePanel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Panneau</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <div className="links d-md-flex justify-content-md-around">
                        <button class="btn btn-primary w-70 mb-2">Mes Favoris</button>
                        <button class="btn btn-secondary w-70 mb-2">Mon Panier</button>
                    </div>
                </div>
            </div>
        </>
    )
}