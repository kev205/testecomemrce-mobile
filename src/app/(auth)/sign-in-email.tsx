import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { TextInput as RnTextInput, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export default function Page() {
  const { signIn, signing } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState<any>();

  const passRef = useRef<RnTextInput>(null);

  const switchSecureEntry = () => setSecureTextEntry((prev) => !prev);

  const onError = (err: any) => setError(err.data?.message);

  const _signIn = useCallback(() => {
    if (signIn && username && password) {
      setError(undefined);
      signIn(username, password)
        .then((res: any) => {
          if (res) router.replace("/(app)/(tabs)/home");
        })
        .catch(onError);
    }
  }, [username, password]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
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
          onSubmitEditing={() => passRef.current?.focus()}
        />
        <View style={{ marginTop: 16 }}>
          <TextInput
            ref={passRef}
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
          <HelperText type="error" visible={!!error} variant="bodyMedium">
            {error}
          </HelperText>
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            onPress={_signIn}
            loading={signing}
            mode="contained"
            theme={{ roundness: 5 }}
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
