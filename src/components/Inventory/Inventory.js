import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch('https://shielded-scrubland-26386.herokuapp.com/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })

    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text" /></p>
                <p><span>price:</span><input type="text" /></p>
                <p><span>Quantity:</span><input type="text" /></p>
                <p><span>Procuct Image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;