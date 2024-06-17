import ForwardButton from "@/src/components/ui/ForwardButton";
import { useAuth } from "@/src/context/AuthContext";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Dialog,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import CountryFlag from "react-native-country-flag";

export default function Page() {
  const { colors } = useTheme();

  const { user, signOut } = useAuth();

  const [avatar, setAvatar] = useState<string>();
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
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 5 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!!avatar ? (
            <Avatar.Image source={{ uri: avatar }} size={100} />
          ) : (
            <Avatar.Icon
              icon={(props) => <FontAwesome name="user" {...props} />}
              size={100}
            />
          )}
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text variant="titleLarge">{user?.username}</Text>
          </View>
        </View>
        {user?.account && (
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
              marginTop: 16,
            }}
          >
            <MaterialIcons
              name="currency-franc"
              size={24}
              color={colors.onBackground}
            />
            <Text
              variant="titleLarge"
              style={{ marginHorizontal: 4, fontWeight: "800" }}
            >
              {user?.account.balance}
            </Text>
          </Pressable>
        )}
      </View>
      {!!user?.bio && (
        <Card
          style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 16 }}
          mode="contained"
        >
          <Card.Title
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: 10 }} variant="titleLarge">
                  Bio
                </Text>
                <Pressable>
                  <FontAwesome
                    name="pencil"
                    size={14}
                    color={colors.onBackground}
                  />
                </Pressable>
              </View>
            }
            subtitle={user.bio}
            subtitleVariant="bodyLarge"
            subtitleNumberOfLines={4}
          />
        </Card>
      )}
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <MaterialCommunityIcons
                name="history"
                size={24}
                color={colors.onBackground}
              />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Transactions
            </Text>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
            onPress={() => router.navigate("/history/")}
          >
            <ForwardButton size={20} color={colors.onBackground} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <MaterialCommunityIcons
                name="storefront"
                size={24}
                color={colors.onBackground}
              />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Products
            </Text>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
            onPress={() => router.navigate("/gallery/")}
          >
            <ForwardButton size={20} color={colors.onBackground} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <Ionicons name="language" size={24} color={colors.onBackground} />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Language
            </Text>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
            onPress={() => router.navigate("/profile/languages")}
          >
            {user?.locale && (
              <CountryFlag
                isoCode={user.locale}
                size={14}
                style={{ marginRight: 14 }}
              />
            )}
            <ForwardButton size={20} color={colors.onBackground} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <FontAwesome
                name="map-marker"
                size={24}
                color={colors.onBackground}
              />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Location Services
            </Text>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
            onPress={() => router.navigate("/profile/locations")}
          >
            <ForwardButton size={20} color={colors.onBackground} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <Ionicons
                name="settings-sharp"
                size={24}
                color={colors.onBackground}
              />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              General
            </Text>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
            onPress={() => router.navigate("/profile/general")}
          >
            <ForwardButton size={20} color={colors.onBackground} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <FontAwesome name="lock" size={24} color={colors.onBackground} />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Privacy
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <ForwardButton size={20} color={colors.onBackground} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 5,
            }}
          >
            <View style={styles.iconMenu}>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={24}
                color={colors.onBackground}
              />
            </View>
            <Text style={{ marginLeft: 20 }} variant="titleMedium">
              Help Center
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <ForwardButton size={20} color={colors.onBackground} />
          </View>
        </View>
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
            <View style={styles.iconMenu}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconMenu: {
    height: 24,
    width: 24,
    alignItems: "center",
  },
});
