import { Article } from "@/api/models/entities";
import { computePrice } from "@/utils/price";
import { View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

export default function PriceView({
  originalPrice,
  discount = 0,
  styles,
  trailingSpaces,
}: {
  originalPrice: number;
  discount?: number;
  styles?: {
    containerStyle?: ViewStyle;
    textVariant1?: VariantProp<never>;
    textVariant2?: VariantProp<never>;
  };
  trailingSpaces?: boolean;
}) {
  return (
    <View
      style={
        styles?.containerStyle ?? {
          marginTop: 5,
        }
      }
    >
      <Text
        variant={styles?.textVariant1 ?? "bodyMedium"}
        style={[
          !!discount && {
            textDecorationLine: "line-through",
            color: "#999",
          },
        ]}
      >
        {`$${originalPrice.toFixed(2)}`}
      </Text>
      {!!discount && (
        <Text
          variant={styles?.textVariant2 ?? "bodyMedium"}
          style={{ fontWeight: "bold" }}
        >{`${trailingSpaces ? "  " : ""} $${computePrice(
          originalPrice,
          discount
        )}`}</Text>
      )}
    </View>
  );
}
