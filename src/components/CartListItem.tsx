import { List, Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Link } from "expo-router";

export default function CartListItem({
  item,
  deleteReq,
}: {
  item: any;
  deleteReq?: any;
}) {
  const { colors } = useTheme();

  const remove = () => deleteReq(item.id);

  const right = () => (
    <Pressable style={{ padding: 5 }} onPress={remove}>
      <MaterialIcons
        name="remove-circle"
        size={24}
        color={colors.onBackground}
      />
    </Pressable>
  );

  const left = () => (
    <MaterialIcons name="shopping-cart" size={32} color={colors.onBackground} />
  );

  return (
    <Link href={`/cart-details/${item.id}`} asChild>
      <List.Item
        left={left}
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              variant={item.discountedTotal ? "bodyMedium" : "bodyLarge"}
              style={[
                item.discountedTotal && {
                  textDecorationLine: "line-through",
                  color: "#999",
                },
              ]}
            >
              {`$${item.total}`}
            </Text>
            {!!item.discountedTotal && (
              <Text
                variant="bodyLarge"
                style={{ marginLeft: 5, fontWeight: "bold" }}
              >{`$${item.discountedTotal}`}</Text>
            )}
          </View>
        }
        description={`${item.totalProducts} Products`}
        right={right}
      />
    </Link>
  );
}
