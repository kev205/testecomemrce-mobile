import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="languages" options={{ presentation: "modal" }} />
      <Stack.Screen name="locations" options={{ presentation: "modal" }} />
      <Stack.Screen name="general" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="add-address"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
