import { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const ListEmptyComponent: FC<any> = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text>No items</Text>
  </View>
);
