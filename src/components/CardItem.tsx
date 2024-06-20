import { Article } from "@/api/models/entities";
import { Link } from "expo-router";
import { FC, memo } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import PriceView from "./PriceView";
import FastImage from "react-native-fast-image";

const CardItem: FC<
  { item: Partial<Article> } & {
    noprice?: boolean;
    size?: number;
  }
> = ({ item, noprice, size }) => {
  return (
    <Link href={`/category/${item.category}/product/${item.id}`} asChild>
      <Pressable
        testID="card-item-container"
        style={{
          flex: 1 / (size ?? 3),
          marginBottom: 8,
          padding: 2,
          marginHorizontal: 2,
        }}
      >
        <FastImage
          style={{ height: 100, width: 100, borderRadius: 8 }}
          source={{
            uri: item.thumbnail,
          }}
          accessibilityLabel="thumbnail"
        />
        <View style={{ marginTop: 5, flex: 0.5, alignItems: "center" }}>
          <Text variant="titleSmall" numberOfLines={1}>
            {item.title}
          </Text>
          <View>
            {!noprice && (
              <PriceView
                originalPrice={item.price}
                discount={item.discountPercentage}
                styles={{
                  textVariant1: "bodyMedium",
                  textVariant2: "bodyMedium",
                }}
              />
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default memo(CardItem);
