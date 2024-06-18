import { useCart } from "@/context/CartContext";
import { List, Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function CartListItem({ item }: { item: any }) {
  const { colors } = useTheme();

  const right = () => <MaterialIcons name="remove-circle" size={24} />;

  const left = () => (
    <MaterialIcons name="shopping-cart" size={24} color={colors.onBackground} />
  );

  return (
    <List.Item
      left={left}
      title={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            variant={item.discountedTotal ? "bodyMedium" : "bodyLarge"}
            style={[
              item.discountedTotal && { textDecorationLine: "line-through" },
            ]}
          >
            {`$${item.total}`}
          </Text>
          {!!item.discountedTotal && (
            <Text variant="bodyLarge">{`$${item.discountedTotal}`}</Text>
          )}
        </View>
      }
      description={`${item.totalProducts} Products`}
      right={right}
    />
  );
}
