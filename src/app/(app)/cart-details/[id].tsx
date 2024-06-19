import { Article } from "@/api/models/entities";
import CartItem from "@/components/CartItem";
import CustomAppHeader from "@/components/CustomAppHeader";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";
import { getCarts } from "@/reducers/auth/cartsSlice";
import { useUpdateCartMutation } from "@/services/carts";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const carts = useSelector(getCarts);

  const cart = carts.find((cart) => cart.id === Number(id));

  const [products, setProducts] = useState<Article[] | undefined>(
    cart?.products
  );

  const removeFromCart = (id: number) => {
    setProducts((prev) => prev?.filter((product) => product.id !== id));
  };

  const [update, { isLoading, error, isSuccess }] = useUpdateCartMutation();

  const renderItem = ({ item }: { item: any }) => (
    <CartItem item={item} removeFromCart={removeFromCart} />
  );

  const keyExtractor = (item: any) => `${item.id}`;

  const saveCart = useCallback(() => {
    if (!id || !products?.length) return;

    update({
      id: Number(id),
      products: products.map((product) => ({
        id: product.id,
        quantity: 1,
      })),
    });
  }, [id, products]);

  return (
    <View style={{ flex: 1, paddingVertical: 16, paddingLeft: 10 }}>
      <Stack.Screen
        options={{
          header: CustomAppHeader,
        }}
      />
      <FlatList
        data={products}
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
        onPress={saveCart}
        theme={{ roundness: 2 }}
      >
        Save Cart
      </Button>
    </View>
  );
}
