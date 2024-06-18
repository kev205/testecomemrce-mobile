import { useAuth } from "@/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Dialog,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";

export default function Page() {
  const { colors } = useTheme();

  const { signOut, user } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loginOut, setLoginOut] = useState(false);

  const flipModal = () => setShowConfirm((prev) => !prev);

  const flipLogoutModal = () => setLoginOut((prev) => !prev);

  const _signOut = () => {
    signOut && signOut();
    setLoginOut(true);
    setShowConfirm(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ alignItems: "center" }}>
        {!!user?.image && <Avatar.Image source={{ uri: user.image }} />}
        <Text variant="titleLarge" style={{ marginTop: 16 }}>
          Hello {user?.username}
        </Text>
      </View>
      <View style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
          onPress={flipModal}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={colors.onBackground}
              />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Sign Out
            </Text>
          </View>
        </Pressable>
      </View>
      <Portal>
        <Dialog visible={showConfirm} onDismiss={flipModal}>
          <Dialog.Title>Sign out?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              This operation will delete all your data on this device. Continue?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={_signOut} labelStyle={{ color: colors.secondary }}>
              Continue
            </Button>
            <Button onPress={flipModal}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
        <Modal
          visible={loginOut}
          onDismiss={flipLogoutModal}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </Modal>
      </Portal>
    </View>
  );
}
