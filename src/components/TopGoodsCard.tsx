import { Article } from "@/api/models/entities";
import { router } from "expo-router";
import { FC, memo, useMemo } from "react";
import { ImageBackground, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SharedValue, runOnJS } from "react-native-reanimated";

type TopGoodsCardProps = {
  item: Partial<Article>;
  animationValue: SharedValue<number>;
  index: number;
  count: number;
};

const TopGoodsCard: FC<TopGoodsCardProps> = ({ item, index, count }) => {
  const { colors } = useTheme();

  const onTap = () => {
    router.navigate(`/product/${item.id}`);
  };

  const goToDetails = useMemo(
    () =>
      Gesture.Tap().onStart(() => {
        "worklet";
        runOnJS(onTap)();
      }),
    []
  );

  return (
    <GestureDetector gesture={goToDetails}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={{ uri: item.thumbnail }} style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          >
            <View style={{ paddingHorizontal: 16, alignSelf: "center" }}>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "bold", color: "#ffff" }}
              >
                {item.name}
              </Text>
              <Text variant="bodyLarge" style={{ color: colors.primary }}>
                {`${item.price} XAF`}
              </Text>
              <Text
                variant="bodyMedium"
                numberOfLines={2}
                style={{ marginTop: 5, color: "#ffff" }}
              >
                {item.description}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingHorizontal: 5,
                paddingVertical: 2.5,
              }}
            >
              <Text variant="labelLarge" style={{ color: "#ffff" }}>
                {index + 1}
              </Text>
              <Text
                variant="labelMedium"
                style={{ color: colors.secondary }}
              >{` / ${count}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </GestureDetector>
  );
};

export default memo(TopGoodsCard);
