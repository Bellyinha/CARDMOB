import React, { createContext, useContext, useState } from "react";

type ShopContextType = {
    cartItems: any[];
    addToCart: (item : any) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    getTotalPrice: () => number;
}

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const addToCart = async (item: any, quantity: number =  1) => {
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(
                cartItem => cartItem.id === item.id
            );
            if (existingIndex >= 0) {
                const updateItems = [...prevItems];
                if (updateItems[existingIndex].quantity + quantity > 0) {
                    updateItems[existingIndex].quantity += quantity;
                }
                return updateItems;
            }
            else {
                return [...prevItems, { ...item, quantity: quantity }];
            }
        })
    }

    const removeFromCart = (itemId: number) => {
        setCartItems((prevItems) => 
            prevItems.filter(item => item.id !== itemId)
        )
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <ShopContext
            value={ { cartItems, addToCart, removeFromCart, getTotalPrice, clearCart } }
        >
            {children}
        </ShopContext>
    );
}

export const useShop = () => useContext(ShopContext);