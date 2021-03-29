import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://shielded-scrubland-26386.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    // useEffect(() => {
    //     fetch('https://shielded-scrubland-26386.herokuapp.com/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://shielded-scrubland-26386.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
        // console.log(products, productKeys)
        // if(products.length > 0){
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey]
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct} product={pd}>

                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
                {/* <h3>This is cart</h3>
                <h5>Order Summary: {cart.length}</h5> */}
            </div>
            {/* <Router></Router> */}
        </div>
    );
};

export default Shop;