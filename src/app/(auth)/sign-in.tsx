import { useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Page() {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <Button
          icon={() => (
            <MaterialIcons
              name="mail-outline"
              size={32}
              color={colors.onBackground}
            />
          )}
          onPress={() => router.navigate("sign-in-email")}
          labelStyle={{ color: colors.onBackground }}
          style={{ width: "100%", marginVertical: 8 }}
          mode="outlined"
          theme={{ roundness: 1 }}
        >
          Sign in with username
        </Button>
      </View>
    </View>
  );
}
