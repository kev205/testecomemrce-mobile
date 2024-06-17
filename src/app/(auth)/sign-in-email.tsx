import { router } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function Page() {
  const [username, setUsername] = useState<string>("");

  const { colors } = useTheme();

  const next = useCallback(() => {
    router.navigate(`/sign-in-password?username=${username}`);
  }, [username]);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          Happy to see you
        </Text>
        <Text style={{ textAlign: "center" }} variant="bodyMedium">
          Enter your username to login to your account
        </Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          value={username}
          label="Username"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setUsername}
          onSubmitEditing={next}
        />
        <View style={{ alignSelf: "flex-end", marginTop: 32 }}>
          <Button
            onPress={next}
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ padding: 8 }}
            labelStyle={{ fontSize: 18 }}
            rippleColor="transparent"
          >
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
