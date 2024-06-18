import CartItem from "@/components/CartItem";
import CustomAppHeader from "@/components/CustomAppHeader";
import { useCart } from "@/context/CartContext";
import { Stack } from "expo-router";
import { FlatList, View } from "react-native";

export default function Page() {
  const { cart } = useCart();

  const renderItem = ({ item }: { item: any }) => <CartItem item={item} />;

  const keyExtractor = (item: any) => `${item.id}`;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          header: CustomAppHeader,
        }}
      />
      <FlatList
        data={cart.products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
      />
    </View>
  );
}
