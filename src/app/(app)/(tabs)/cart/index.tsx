import CartListItem from "@/components/CartListItem";
import CustomAppHeader from "@/components/CustomAppHeader";
import { useAuth } from "@/context/AuthContext";
import { useLazyCartsByUserQuery } from "@/services/carts";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";

export default function Page() {
  const { user } = useAuth();

  const [fetchCarts, { data, error }] = useLazyCartsByUserQuery();

  useEffect(() => {
    if (user?.id) fetchCarts(user.id);
  }, [user?.id]);

  const renderItem = ({ item }: { item: any }) => <CartListItem item={item} />;

  const keyExtractor = (item: any) => `${item.id}`;

  return (
    <View style={{ flex: 1, paddingLeft: 5 }}>
      <Stack.Screen
        options={{
          header: CustomAppHeader,
        }}
      />
      <FlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
      />
    </View>
  );
}
