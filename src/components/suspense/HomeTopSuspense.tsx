import { Text, View } from "react-native";
import CardItemSuspense from "./CardItemSuspense";

export default function HomeSectionSuspense() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
        marginTop: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 5,
        }}
      >
        <Text style={{ backgroundColor: "#999", width: 200, height: 10 }} />
      </View>
      <View style={{ flex: 1, paddingVertical: 5 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
          <CardItemSuspense />
          <CardItemSuspense />
          <CardItemSuspense />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
          <CardItemSuspense />
          <CardItemSuspense />
          <CardItemSuspense />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
          <CardItemSuspense />
          <CardItemSuspense />
          <CardItemSuspense />
        </View>
      </View>
    </View>
  );
}
