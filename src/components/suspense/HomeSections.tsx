import { useCallback } from "react";
import { Dimensions, View } from "react-native";
import { router } from "expo-router";
import { useProductsOfFavoriteCategoryQuery } from "@/services/products";
import MySectionList from "../MySectionList";
import CardItem from "../CardItem";
import { capitalizeString } from "@/utils/string";

const { width } = Dimensions.get("screen");

type Article = any;

type Section = {
  id: string;
  title: string;
  items: any[];
  hasMore?: boolean;
} & {
  display: "grid" | "list";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  renderItem?: any;
  onMore?: any;
};

const category = "smartphones";

export default function HomeSections() {
  const { data } = useProductsOfFavoriteCategoryQuery({
    category,
    page: {
      skip: 0,
      limit: 12,
    },
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
  });

  const renderGood = ({ item }: { item: Partial<Article>; index: number }) => (
    <CardItem key={item.id} item={item} size={width / 4 + width / 25} />
  );

  const renderSectionItems = useCallback(
    (item: Partial<Section>) =>
      !item.items?.length ? null : (
        <MySectionList
          key={item.id}
          contentContainerStyle={{
            marginVertical: 2.5,
          }}
          display={item.display}
          flexDirection={item.flexDirection}
          hasMore={item.hasMore}
          onMore={item.onMore}
          items={item.items}
          renderItem={item.renderItem}
          title={item.title}
        />
      ),
    []
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
        marginTop: 16,
      }}
    >
      {[
        {
          id: category,
          title: capitalizeString(category),
          items: data?.products,
          hasMore: data?.total > 12,
          onMore: () => router.navigate(`/(app)/(all)/${category}`),
          display: "grid",
          flexDirection: "row",
          renderItem: renderGood,
        } as Partial<Section>,
      ].map(renderSectionItems)}
    </View>
  );
}
