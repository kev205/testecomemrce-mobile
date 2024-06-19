import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="product" options={{ headerShown: false }} />
    </Stack>
  );
}
