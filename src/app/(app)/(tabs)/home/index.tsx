import { useCallback } from "react";
import { Dimensions, ScrollView } from "react-native";
import { SharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import HomeSections from "@/components/suspense/HomeSections";
import TopGoodsCard from "@/components/TopGoodsCard";
import { useTopProductsQuery } from "@/services/products";
import { Article } from "@/api/models/entities";

const { width, height } = Dimensions.get("screen");

export default function Page() {
  const { data: topGoods } = useTopProductsQuery({
    page: {
      skip: 0,
      limit: 5,
    },
    sortBy: "meta.creadtedAt",
    order: "desc",
    select: "id,category,title,description,thumbnail",
  });

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
      <HomeSections />
    </ScrollView>
  );
}
