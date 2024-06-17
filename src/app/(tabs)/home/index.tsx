import { Suspense, useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useAuth } from "@/context/AuthContext";
import HomeSections from "@/components/suspense/HomeSections";
import TopGoodsCard from "@/components/TopGoodsCard";
import { useTopProductsQuery } from "@/services/products";

const { width, height } = Dimensions.get("screen");

type Article = any;

export default function Page() {
  // states

  const { data: topGoods } = useTopProductsQuery({
    page: { skip: 0, limit: 5 },
  });

  const { setUser } = useAuth();

  // api calls
  const profileData: any = {};

  useEffect(() => {
    if (profileData) {
      setUser && setUser(profileData.getProfile);
    }
  }, [profileData]);

  const renderTopProduct = useCallback(
    ({
      item,
      animationValue,
      index,
    }: {
      item: Partial<Article>;
      animationValue: SharedValue<number>;
      index: number;
    }) => (
      <TopGoodsCard
        item={item}
        animationValue={animationValue}
        index={index}
        count={topGoods?.products?.length}
      />
    ),
    [topGoods]
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 5,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Carousel
        style={{ width }}
        width={width}
        height={height / 3}
        data={topGoods?.products}
        autoPlayInterval={2000}
        scrollAnimationDuration={1000}
        renderItem={renderTopProduct}
        windowSize={1}
        autoPlay
        loop={false}
      />
      <Suspense
        fallback={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        }
      >
        <HomeSections />
      </Suspense>
    </ScrollView>
  );
}
