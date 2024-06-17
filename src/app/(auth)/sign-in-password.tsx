import { useAuth } from "@/context/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export default function Page() {
  const { username } = useLocalSearchParams<{ username: string }>();

  const { signIn, signing } = useAuth();

  const [password, setPassword] = useState<string>("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);
  const [isSigning, setIsSigning] = useState(signing);

  const switchSecureEntry = () => setSecureTextEntry((prev) => !prev);

  const onError = () => setError(true);

  const _signIn = useCallback(() => {
    setIsSigning(false);
    if (signIn && username && password) {
      signIn(username, password)
        .then(() => router.replace("/(app)/(tabs)/home"))
        .catch(onError);
    }
  }, [password]);

  useEffect(() => {
    setIsSigning(signing);
  }, [signing]);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          One more step for the end
        </Text>
        <Text
          style={{ textAlign: "center" }}
          variant="bodyMedium"
        >{`Enter your password to login with ${username}`}</Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          value={password}
          label="Password"
          textContentType="password"
          onChangeText={setPassword}
          onSubmitEditing={_signIn}
          autoCapitalize="none"
          autoCorrect={false}
          right={
            <TextInput.Icon
              onPress={switchSecureEntry}
              icon={secureTextEntry ? "eye" : "eye-off"}
            />
          }
          secureTextEntry={secureTextEntry}
        />
        <HelperText type="error" visible={error}>
          Incorrect password
        </HelperText>
        <View style={{ alignSelf: "flex-end", marginTop: 32 }}>
          <Button
            onPress={_signIn}
            loading={isSigning}
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ padding: 8 }}
            labelStyle={{ fontSize: 18 }}
            rippleColor="transparent"
          >
            Sign In
          </Button>
        </View>
      </View>
    </View>
  );
}
