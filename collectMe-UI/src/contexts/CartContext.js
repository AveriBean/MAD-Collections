import { createContext, useState, useEffect } from "react";
import { findAll } from "../services/itemService";

export const CartContext = createContext({
    items: [],
    getItemQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});


export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [storeItems, setStoreItems] = useState([]);
    console.log(storeItems);
    
    useEffect(() => {
        findAll()
            .then(setStoreItems)
            .catch(alert);
    }, []);

    function getItemQuantity(itemId) {
        const quantity = cartItems.find(item => item.itemId === itemId)?.quantity;

        if(quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart (itemId) {
        const quantity = getItemQuantity(itemId);

        if(quantity === 0) {
            setCartItems(
                [
                    ...cartItems,
                    {
                        itemId: itemId,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartItems(
                cartItems.map(item => item.itemId === itemId 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            )
        }
    }

    function deleteFromCart(itemId) {
        setCartItems(
            cartItems => cartItems.filter(currentItem => {
                return currentItem.itemId !== itemId;
            })
        )
    }

    function removeOneFromCart(itemId) {
        const quantity = getItemQuantity(itemId);

        if(quantity === 1) {
            deleteFromCart(itemId);
        } else {
            setCartItems(
                cartItems.map(item => item.itemId === itemId 
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
            )
        }
    }

    function getItemData(itemId) {
        let itemData = storeItems.find(i => i.itemId === itemId)

        if (itemData === undefined) {
            console.log("Item data does not exist for ID: " + itemId);
        }

        return itemData;
    }

    function getTotalCost() {
        let totalCost = 0;

        cartItems.map((cartItem) => {
            const itemData = getItemData(cartItem.itemId);
            totalCost += (itemData.value * cartItem.quantity);
            return totalCost;
        });        
    }


    const contextValue = {
        items: cartItems,
        getItemQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,

    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;