import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkkTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(app)/(tabs)/home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CombinedDefaultTheme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 5,
};

const CombinedDarkTheme = {
  ...DarkkTheme,
  ...NavigationDarkTheme,
  roundness: 5,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const theme = useMemo(() => {
    return colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
  }, [colorScheme]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <Provider store={store}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </Provider>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
