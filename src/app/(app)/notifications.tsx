import CustomAppHeader from "@/components/CustomAppHeader";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Notifications",
          header: CustomAppHeader,
          headerShown: true,
        }}
      />
      <Text variant="headlineMedium">Upcoming in v2.0</Text>
    </View>
  );
}
