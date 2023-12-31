
import { createContext, useState, useEffect} from 'react';

export const CartContext= createContext()


//children es a quien le estoy pasando la información
export const CartContextProvider = ({children}) => {
//cart es un array vacío de productos agregados    
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calcular el precio total cada vez que el carrito cambie
        const newTotalPrice = cart.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        setTotalPrice(newTotalPrice);
      }, [cart]);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)){
            setCart(prev => [...prev, {...item, quantity}])
        } else {
            console.error("already in cart")
        }
    }
    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId)
        setCart(cartUpdated)
    }

    const clearCart = () => {
        setCart([])
    }
    
    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId)
    }

    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);



    return(
        //Value son los valores que el provider le pasa a sus hijos
        <CartContext.Provider value={{cart, addItem, removeItem, clearCart, totalQuantity, totalPrice}}>
            {children} {/*A quien le estoy pasando la información*/}
        </CartContext.Provider>


    )
}

export default CartContextProvider