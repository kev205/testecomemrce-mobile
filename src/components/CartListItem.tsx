import { List, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import PriceView from "./PriceView";

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
          <PriceView
            originalPrice={item.total}
            discount={((item.total - item.discountedTotal) / item.total) * 100}
            styles={{
              containerStyle: { flexDirection: "row", alignItems: "center" },
              textVariant1: item.discountedTotal ? "bodyMedium" : "bodyLarge",
              textVariant2: "bodyLarge",
            }}
          />
        }
        description={`${item.totalProducts} Products`}
        right={right}
      />
    </Link>
  );
}
