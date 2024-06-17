import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Platform } from "react-native";

const Component: FC<{ size?: number; color?: string }> = ({ color, size }) => {
  return (
    <MaterialIcons
      name={Platform.OS === "android" ? "arrow-forward" : "arrow-forward-ios"}
      size={size ?? 24}
      color={color}
    />
  );
};

export default Component;
