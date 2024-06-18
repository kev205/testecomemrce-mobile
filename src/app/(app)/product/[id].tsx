import { useCart } from "@/context/CartContext";
import { useGetProductQuery } from "@/services/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("screen");

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useGetProductQuery(Number(id));

  const { addToCart } = useCart();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen options={{ headerTitle: data?.title ?? "" }} />
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: data?.thumbnail }}
          // sharedTransitionTag="sharedCartThumbnail"
          style={{ width: "100%", height: 200 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            padding: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleLarge" numberOfLines={2}>
              {data?.title}
            </Text>
          </View>
          <Text
            variant="bodyLarge"
            style={{ fontWeight: "bold" }}
          >{`$${data?.price}`}</Text>
        </View>
        <View style={{ flex: 1, padding: 5 }}>
          <Text variant="bodyLarge" numberOfLines={5}>
            {data?.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            {data?.tags?.map((tag: string) => (
              <Chip
                key={tag}
                mode="outlined"
                style={{ marginHorizontal: 4 }}
                textStyle={{ fontSize: 12 }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Button mode="contained" onPress={() => addToCart(data)}>
          Add to cart
        </Button>
      </View>
    </View>
  );
}
