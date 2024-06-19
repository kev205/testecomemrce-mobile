import { Article } from "@/api/models/entities";
import CardItem from "@/components/CardItem";
import CustomAppHeader from "@/components/CustomAppHeader";
import { useProductsByCategoryQuery } from "@/services/products";
import { capitalizeString } from "@/utils/string";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Page() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();

  const [page, setPage] = useState({ skip: 0, limit: 12 });

  const { data, isLoading, isFetching } = useProductsByCategoryQuery({
    category: id ?? "",
    page,
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
  });

  const renderProduct = ({
    item,
  }: {
    item: Partial<Article>;
    index: number;
  }) => <CardItem key={item.id} item={item} size={3} />;

  const keyExtractor = (item: Article) => `${item.id}`;

  const loadMore = useCallback(() => {
    if (data.total > data.products?.length)
      setPage((prev) => ({ skip: prev.skip + prev.limit, limit: prev.limit }));
  }, [data]);

  return (
    <>
      <Stack.Screen
        options={{
          title: name ?? capitalizeString(id ?? ""),
          header: CustomAppHeader,
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 5,
          }}
          numColumns={3}
          columnWrapperStyle={{
            flexWrap: "wrap",
            width: "100%",
          }}
          data={data?.products}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          // onEndReachedThreshold={0.3}
          // onEndReached={loadMore}
          // ListFooterComponent={() => (
          //   <ActivityIndicator animating={isFetching} />
          // )}
        />
      )}
    </>
  );
}
