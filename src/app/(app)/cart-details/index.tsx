import CartItem from "@/components/CartItem";
import CustomAppHeader from "@/components/CustomAppHeader";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAddCartMutation } from "@/services/carts";
import { Stack } from "expo-router";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";

export default function Page() {
  const { cart, removeFromCart } = useCart();

  const { user } = useAuth();

  const [add, { isLoading, error, isSuccess }] = useAddCartMutation();

  const renderItem = ({ item }: { item: any }) => (
    <CartItem item={item} removeFromCart={removeFromCart} />
  );

  const keyExtractor = (item: any) => `${item.id}`;

  const addCart = useCallback(() => {
    if (!user || !cart.products?.length) return;

    add &&
      add({
        userId: user.id,
        products: cart.products.map((product) => ({
          id: product.id,
          quantity: 1,
        })),
      });
  }, [user, cart?.products]);

  return (
    <View style={{ flex: 1, paddingVertical: 16, paddingLeft: 10 }}>
      <Stack.Screen
        options={{
          header: CustomAppHeader,
        }}
      />
      <FlatList
        data={cart.products}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
      <Button
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        onPress={addCart}
        theme={{ roundness: 2 }}
      >
        Save Cart
      </Button>
    </View>
  );
}
