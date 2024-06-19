import CustomAppHeader from "@/components/CustomAppHeader";
import { useCart } from "@/context/CartContext";
import { useGetProductQuery } from "@/services/products";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";
import {
  ActivityIndicator,
  Badge,
  Button,
  Chip,
  Text,
} from "react-native-paper";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = useGetProductQuery(Number(id));

  const { addToCart, total } = useCart();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          title: data?.title ?? "",
          header: (props) => (
            <CustomAppHeader
              {...props}
              actions={[
                {
                  onPress: () => router.navigate("/cart-details/"),
                  icon: (p: any) => (
                    <>
                      <MaterialIcons name="shopping-cart" {...p} size={24} />
                      {!!total && (
                        <Badge
                          style={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            fontSize: 10,
                          }}
                          size={16}
                        >
                          {total}
                        </Badge>
                      )}
                    </>
                  ),
                  key: "cart",
                },
              ]}
            />
          ),
        }}
      />
      {isLoading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: data?.thumbnail }}
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
            <Button
              mode="contained"
              onPress={() => addToCart && addToCart(data)}
              theme={{ roundness: 2 }}
            >
              Add to cart
            </Button>
          </View>
        </>
      )}
    </View>
  );
}
