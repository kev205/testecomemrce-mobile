import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Appbar, Badge } from "react-native-paper";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { StyleProp, TextStyle } from "react-native";
import { useCart } from "@/context/CartContext";

export default function CustomHeader({
  options,
  titleStyle,
}: BottomTabHeaderProps & {
  colors: MD3Colors;
  titleStyle?: StyleProp<TextStyle>;
}) {
  const goToCart = () => router.navigate("/cart-details/");

  const goToNotif = () => router.navigate("/notifications/");

  const { total } = useCart();

  return (
    <Appbar.Header mode="small">
      <Appbar.Content title={options.title ?? ""} titleStyle={titleStyle} />
      <Appbar.Action
        icon={(props) => (
          <>
            <FontAwesome name="bell-o" {...props} />
            <Badge
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                fontSize: 10,
              }}
              size={16}
            >
              2
            </Badge>
          </>
        )}
        rippleColor="transparent"
        animated={false}
        onPress={goToNotif}
        size={22}
      />
      <Appbar.Action
        icon={(props) => (
          <>
            <MaterialIcons name="shopping-cart" {...props} />
            {!!total && (
              <Badge
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  fontSize: 10,
                }}
                size={16}
              >
                {total}
              </Badge>
            )}
          </>
        )}
        rippleColor="transparent"
        animated={false}
        onPress={goToCart}
        size={24}
      />
    </Appbar.Header>
  );
}
