import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {
    addToCart as addToCartApi,
    emptyCart as emptyCartApi,
    getCart,
    removeCartItem as removeCartItemApi,
    updateCartItem as updateCartItemApi
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({children}) {

    const {user, isLoggedIn} = useAuth();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const refreshCart = useCallback(async () => {
        if (!isLoggedIn || !user?.userId) {
            setCart(null);
            return;
        }

        setLoading(true);
        try {
            const data = await getCart(user.userId);
            setCart(data);
        } catch {
            setCart(null);
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn, user?.userId]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addItem = async (productId, quantity = 1) => {
        const data = await addToCartApi(user.userId, productId, quantity);
        setCart(data);
        return data;
    };

    const updateItem = async (productId, quantity) => {
        const data = await updateCartItemApi(user.userId, productId, quantity);
        setCart(data);
        return data;
    };

    const removeItem = async (productId) => {
        const data = await removeCartItemApi(user.userId, productId);
        setCart(data);
        return data;
    };

    const clearCart = async () => {
        const data = await emptyCartApi(user.userId);
        setCart(data);
        return data;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                itemCount,
                loading,
                refreshCart,
                addItem,
                updateItem,
                removeItem,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}