import { Text, View } from "react-native";

export default function CardItemSuspense({ n = 3 }: { n?: number }) {
  return (
    <View
      style={{
        flex: 1 / n,
        marginBottom: 8,
        padding: 2,
        marginHorizontal: 2,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          backgroundColor: "#999",
        }}
      />
      <View style={{ marginTop: 5, flex: 0.5 }}>
        <Text style={{ backgroundColor: "#999", width: 100, height: 10 }} />
        <Text
          style={{
            backgroundColor: "#999",
            width: 50,
            height: 10,
            marginTop: 5,
          }}
        />
      </View>
    </View>
  );
}
