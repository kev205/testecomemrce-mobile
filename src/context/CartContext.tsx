import { Cart } from "@/api/models/entities";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface CartContextType {
  cart: Partial<Cart>;
  total?: number;
  addToCart?: (item?: any) => void;
  removeFromCart?: (id: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: {},
});

export function useCart() {
  const value = useContext(CartContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Partial<Cart>>({});

  const addToCart = (item?: any) => {
    setCart((prev) => {
      const tmp = (prev.products ?? []).filter(
        (product) => product.id !== item.id
      );

      return {
        ...prev,
        products: [item, ...tmp],
      };
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const tmp = prev.products?.filter((product) => product.id !== id);

      return {
        ...prev,
        products: tmp,
      };
    });
  };

  const total = useMemo(() => {
    return cart?.products?.length;
  }, [cart?.products]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
