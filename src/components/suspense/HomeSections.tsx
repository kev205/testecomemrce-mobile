import { useCallback } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useProductsOfFavoriteCategoryQuery } from "@/services/products";
import MySectionList from "../MySectionList";
import CardItem from "../CardItem";
import { capitalizeString } from "@/utils/string";
import { Article } from "@/api/models/entities";
import { favoriteCategory } from "@/app";

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
  gridSize?: number;
};

export default function HomeSections() {
  const { data } = useProductsOfFavoriteCategoryQuery({
    category: favoriteCategory,
    page: {
      skip: 0,
      limit: 9,
    },
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
  });

  const renderProduct = ({
    item,
    gridSize,
  }: {
    item: Partial<Article>;
    gridSize?: number;
  }) => <CardItem key={item.id} item={item} size={gridSize} />;

  const renderSectionItems = useCallback(
    (section: Partial<Section>) =>
      !section.items?.length ? null : (
        <MySectionList
          key={section.id}
          contentContainerStyle={{
            marginVertical: 2.5,
          }}
          display={section.display}
          flexDirection={section.flexDirection}
          hasMore={section.hasMore}
          onMore={section.onMore}
          items={section.items}
          renderItem={(item: any) =>
            section.renderItem({ ...item, gridSize: section.gridSize })
          }
          title={section.title}
          gridSize={section.gridSize}
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
          id: favoriteCategory,
          title: capitalizeString(favoriteCategory),
          items: data?.products,
          hasMore: data?.total > 12,
          onMore: () => router.navigate(`/(app)/category/${favoriteCategory}`),
          display: "grid",
          flexDirection: "row",
          renderItem: renderProduct,
          gridSize: 3,
        } as Partial<Section>,
      ].map(renderSectionItems)}
    </View>
  );
}
