import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../Context/Context'
import "./Products.css"


const Products = () => {

    const [products, setProducts] = useState([])
    const {cart, setCart} = useContext(Context)

    useEffect (() => {
        fetch("/data.json")
        .then ((response) => response.json())
        .then ((data) => setProducts(data))

    }, [])

    const buyProducts = (product) => {
        
        setCart ([...cart, product])

    }

    return products.map((product) => {

        return(
            <div className = "card" key={product.id}>
                <img src = {product.img} alt = "img-product-card"/>
                <h3>{product.name}</h3>
                <h4>{product.price}</h4>
                <button onClick={() => buyProducts(product)}>buy</button>
            </div>
        )
    })
}

export default Products
