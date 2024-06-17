import { useCallback, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MySectionList from "../product/MySectionList";
import { router } from "expo-router";
import CardItem from "../product/CardItem";

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

export default function HomeSections() {
  const [sections, setSections] = useState<Array<Partial<Section>>>([]);

  const data: any = {};

  useEffect(() => {
    if (data?.products) {
      setSections(
        data.products.items.map((section) => ({
          id: section.id,
          title: section.name,
          items: section.articles,
          hasMore: (section.articles?.length ?? 0) >= 12,
          onMore: () =>
            section.name &&
            router.navigate(`/(app)/all/${section.name.toLowerCase()}`),
          display: "list",
          flexDirection: "row",
          renderItem: renderGood,
        }))
      );
    }
  }, [data]);

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
      }}
    >
      {[...sections].map(renderSectionItems)}
    </View>
  );
}
