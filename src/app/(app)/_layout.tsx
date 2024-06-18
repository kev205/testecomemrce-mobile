import { useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import {
  Redirect,
  Stack,
  useRootNavigationState,
  useSegments,
} from "expo-router";

export default function _layout() {
  const segments = useSegments();

  const navigationState = useRootNavigationState();

  const { session, isLoaded } = useAuth();

  if (!navigationState?.key || isLoaded) return;

  if (!session && segments[0] !== "(auth)") {
    return <Redirect href="/sign-in" />;
  }

  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
