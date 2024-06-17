import CustomAppHeader from "@/components/CustomAppHeader";
import { SearchBox } from "@/components/search/SearchBox";
import { Stack } from "expo-router";
import { useRef } from "react";
import { FlatList, View } from "react-native";

export default function Page() {
  const listRef = useRef<FlatList>(null);

  function scrollToTop(loading?: boolean) {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }

  return (
    <View style={{ flex: 1, paddingLeft: 5 }}>
      <Stack.Screen
        options={{
          header: CustomAppHeader,
        }}
      />
    </View>
  );
}
