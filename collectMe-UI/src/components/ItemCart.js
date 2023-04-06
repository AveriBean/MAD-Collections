import { Button } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";


function ItemCart(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const itemData = cart.getItemData(id);
    console.log(itemData);

    return (
        <>
            <h3>{itemData.itemName}</h3>
            <p>{quantity} Total</p>
            <p>${ (quantity * itemData.value).toFixed(2) }</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )

}

export default ItemCart;