import { router } from "expo-router";
import { FC, memo } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

const height = 195;

const { width } = Dimensions.get("screen");

type Article = any;

const CardItem: FC<
  { item: Partial<Article> } & {
    noprice?: boolean;
    size?: number;
  }
> = ({ item, noprice, size }) => {
  const { colors } = useTheme();

  const onPress = () => {
    router.navigate(`/product/${item.id}`);
  };

  return (
    <Pressable
      style={{
        width: size ?? width / 3 - 10,
        height,
        marginBottom: 8,
        paddingVertical: 5,
        marginRight: 7.5,
      }}
      onPress={onPress}
    >
      <Animated.Image
        style={{ flex: 1, borderRadius: 8 }}
        source={{
          uri: item.thumbnail,
        }}
        sharedTransitionTag="sharedCartThumbnail"
      />
      <View style={{ marginTop: 5, flex: 0.5 }}>
        <Text variant="titleSmall" numberOfLines={1}>
          {item.title}
        </Text>
        <View>
          {!noprice && (
            <Text
              variant="bodyMedium"
              style={{ color: colors.primary, marginTop: 5 }}
              numberOfLines={1}
            >{`${item.price} XAF`}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(CardItem);
