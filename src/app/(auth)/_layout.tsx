import { Stack } from "expo-router";
import { Appbar } from "react-native-paper";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    />
  );
}
