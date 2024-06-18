import CartListItem from "@/components/CartListItem";
import CustomAppHeader from "@/components/CustomAppHeader";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";
import { useAuth } from "@/context/AuthContext";
import { getCarts, isCartsLoaded } from "@/reducers/auth/cartsSlice";
import {
  useDeleteCartMutation,
  useLazyCartsByUserQuery,
} from "@/services/carts";
import { Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useAuth();

  const { colors } = useTheme();

  const [fetchCarts] = useLazyCartsByUserQuery();

  const [deleteReq] = useDeleteCartMutation();

  const data = useSelector(getCarts);

  const isLoaded = useSelector(isCartsLoaded);

  const [showConfirm, setShowConfirm] = useState(false);

  const [item, setItem] = useState<number>();

  const flipModal = () => setShowConfirm((prev) => !prev);

  const deleteConfirmation = (id: number) => {
    setShowConfirm(true);
    setItem(id);
  };

  const _delete = useCallback(() => {
    setShowConfirm(false);
    item && deleteReq(item);
  }, [item]);

  useEffect(() => {
    if (user?.id) fetchCarts({ id: user.id, skip: 0, limit: 10 });
  }, [user?.id]);

  const renderItem = ({ item }: { item: any }) => (
    <CartListItem item={item} deleteReq={deleteConfirmation} />
  );

  const keyExtractor = (item: any) => `${item.id}`;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          header: CustomAppHeader,
        }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
      <Portal>
        <Dialog visible={showConfirm} onDismiss={flipModal}>
          <Dialog.Title>Sign out?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              This operation is not reversible. Continue?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={_delete} labelStyle={{ color: colors.secondary }}>
              Yes
            </Button>
            <Button onPress={flipModal}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
