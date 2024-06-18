import { useState } from "react";
import { Avatar, List, Text, useTheme } from "react-native-paper";
import Quantifier from "./Quantifier";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CartItem({
  item,
  removeFromCart,
}: {
  item: any;
  removeFromCart?: any;
}) {
  const { colors } = useTheme();

  const remove = () => removeFromCart && removeFromCart(item.id);

  const [qte, setQte] = useState(1);

  const increment = () => setQte((prev) => prev + 1);

  const decrement = () => setQte((prev) => (prev <= 0 ? 0 : prev - 1));

  const right = () => (
    <Quantifier increment={increment} decrement={decrement} count={qte} />
  );

  const left = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable style={{ padding: 5, marginRight: 5 }} onPress={remove}>
        <MaterialIcons name="close" size={24} color={colors.onBackground} />
      </Pressable>
      <Avatar.Image source={{ uri: item.thumbnail }} size={50} />
    </View>
  );

  return (
    <List.Item
      left={left}
      title={item.title}
      description={`$${item.price}`}
      right={right}
    />
  );
}
