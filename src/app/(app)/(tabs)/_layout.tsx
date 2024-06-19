import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import { Avatar, useTheme } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size ?? 24}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: "transparent",
          elevation: 0,
        },
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon({ color }) {
            return (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={color}
                style={{ marginBottom: -3 }}
              />
            );
          },
          tabBarItemStyle: { marginBottom: 4 },
          header: (props) => (
            <CustomHeader
              colors={colors}
              titleStyle={{ fontWeight: "bold", fontSize: 20 }}
              {...props}
            />
          ),
          title: "Home",
          tabBarLabel: "Home",
          headerTitleStyle: { backgroundColor: "red" },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon({ color }) {
            return <TabBarIcon name="search" color={color} />;
          },
          tabBarItemStyle: { marginBottom: 4 },
          headerShown: false,
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon({ color }) {
            return <FontAwesome name="shopping-cart" size={24} color={color} />;
          },
          tabBarItemStyle: { marginBottom: 4 },
          title: "Paniers",
          header: (props) => <CustomHeader colors={colors} {...props} />,
          lazy: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon({ color, size }) {
            return !!user?.image ? (
              <Avatar.Image source={{ uri: user.image }} size={size} />
            ) : (
              <TabBarIcon name="user-circle" color={color} />
            );
          },
          tabBarItemStyle: { marginBottom: 4 },
          title: "Profile",
          header: (props) => <CustomHeader colors={colors} {...props} />,
        }}
      />
    </Tabs>
  );
}
