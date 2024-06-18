import CardItem from "@/components/CardItem";
import { useProductsByCategoryQuery } from "@/services/products";
import { capitalizeString } from "@/utils/string";
import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList } from "react-native";

type Article = any;

const { width } = Dimensions.get("screen");

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useProductsByCategoryQuery({
    category: id ?? "",
    page: {
      skip: 0,
      limit: 12,
    },
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
  });

  const renderGood = ({ item }: { item: Partial<Article>; index: number }) => (
    <CardItem key={item.id} item={item} size={width / 4 + width / 25} />
  );

  const keyExtractor = (item: Article) => `${item.id}`;

  return (
    <>
      <Stack.Screen options={{ headerTitle: capitalizeString(id ?? "") }} />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}
        numColumns={3}
        columnWrapperStyle={{
          flexWrap: "wrap",
          width: "100%",
        }}
        data={data?.products}
        renderItem={renderGood}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
