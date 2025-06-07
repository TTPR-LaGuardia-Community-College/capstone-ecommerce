import { useContext } from "react";
import { Context } from "../../Context/Context";
import products from "../Products/Products";

const CartElements = () => {
    const {cart} = useContext(Context)

    return cart.map ((product) => {
        return (

        <div className="product-card-container" key = {product.id}>
            <img src = {product.img} alt = "image product"/>
            <h3>{product.name}</h3>
            <h4>{product.price}</h4>
        </div>
        
        )

    })

}

export default CartElements