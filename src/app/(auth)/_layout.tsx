import { Stack } from "expo-router";
import { Appbar } from "react-native-paper";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        header({ navigation: { canGoBack, goBack } }) {
          return (
            <Appbar.Header mode="small">
              {canGoBack() && <Appbar.BackAction onPress={goBack} />}
              <Appbar.Content title="" />
            </Appbar.Header>
          );
        },
      }}
    />
  );
}
