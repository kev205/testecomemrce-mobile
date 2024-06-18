import { FontAwesome } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function Quantifier({
  increment,
  decrement,
  count,
}: {
  increment: any;
  decrement: any;
  count: number;
}) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable style={{ opacity: 0.7, padding: 5 }} onPress={decrement}>
        <FontAwesome
          name="minus-circle"
          size={32}
          color={colors.onBackground}
        />
      </Pressable>
      <Text variant="titleMedium" style={{ paddingHorizontal: 5 }}>
        {count}
      </Text>
      <Pressable style={{ opacity: 0.7, padding: 5 }} onPress={increment}>
        <FontAwesome name="plus-circle" size={32} color={colors.onBackground} />
      </Pressable>
    </View>
  );
}
