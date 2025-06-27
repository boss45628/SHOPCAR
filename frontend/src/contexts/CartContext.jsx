import { createContext, useContext, useState } from 'react';

// React 的 Context 物件，可以被任何元件使用的購物車
const CartContext = createContext();

//取得購物車的功能和狀態
export const useCart = () => useContext(CartContext);

//讓所有子元件可以使用購物車功能
export const CartProvider = ({ children }) => {
  //建立購物車 存放購物車內容的地方
  const [cartItems, setCartItems] = useState([]);
  //加入商品到購物車
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      //如果有商品就+1
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      //沒有的話預設1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    //把上面定義的資料與方法包起來，透過 Provider 傳遞給所有包在這個元件下的子元件
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
