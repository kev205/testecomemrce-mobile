import { lazy, Suspense, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import TopGoodsCard from "@/components/TopGoodsCard";
import {
  useListCategoriesQuery,
  useTopProductsQuery,
} from "@/services/products";
import { Article } from "@/api/models/entities";
import { Text } from "react-native-paper";
import CategoryItem from "@/components/CategoryItem";
import HomeCarouselSuspense from "@/components/suspense/HomeCarouselSuspense";
import HomeSectionSuspense from "@/components/suspense/HomeTopSuspense";

// lazy imports for suspense
const HomeCarousel = lazy(() => import("@/components/HomeCarousel"));
const HomeSections = lazy(() => import("@/components/HomeSections"));

export default function Page() {
  const { data: topGoods } = useTopProductsQuery({
    page: {
      skip: 0,
      limit: 5,
    },
    sortBy: "meta.creadtedAt",
    order: "desc",
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
  });

  const { data: categories } = useListCategoriesQuery({});

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
        paddingVertical: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Suspense fallback={<HomeCarouselSuspense />}>
        <HomeCarousel
          products={topGoods?.products}
          renderItem={renderTopProduct}
        />
      </Suspense>
      <Suspense fallback={<HomeSectionSuspense />}>
        <HomeSections />
      </Suspense>
      <View>
        <Text
          style={{ marginVertical: 10, fontWeight: "700" }}
          variant="titleLarge"
        >
          Categories
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {categories?.map((category: any) => (
            <CategoryItem key={category.slug} item={category} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
