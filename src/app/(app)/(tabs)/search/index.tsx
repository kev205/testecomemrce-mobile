import { Article } from "@/api/models/entities";
import CardItem from "@/components/CardItem";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";
import { useSearchProductsQuery } from "@/services/products";
import { useEffect, useRef, useState, useTransition } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";

export default function Page() {
  const listRef = useRef<FlatList>(null);

  const [page, setPage] = useState({ skip: 0, limit: 12 });
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deferredQuery, setDefferedQuery] = useState(query);

  const { data, isLoading } = useSearchProductsQuery({
    page,
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
    q: deferredQuery,
  });

  useEffect(() => {
    if (query === "" || query.trim().length > 3) {
      startTransition(() => {
        setDefferedQuery(query);
      });
    }
  }, [query]);

  const renderProduct = ({
    item,
  }: {
    item: Partial<Article>;
    index: number;
  }) => <CardItem key={item.id} item={item} size={3} />;

  const keyExtractor = (item: Article) => `${item.id}`;

  useEffect(() => {
    if (data?.product?.length) {
      listRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }
  }, [data]);

  return (
    <View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 5,
        }}
      >
        <Searchbar
          value={query}
          placeholder="Find anything here..."
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          style={{ flex: 1, marginRight: 2.5 }}
          theme={{ roundness: 2 }}
        />
      </View>
      {isLoading ? (
        <View style={{ flex: 1, marginTop: 16 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          data={data?.products}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          numColumns={3}
          refreshing={isPending}
          ListEmptyComponent={ListEmptyComponent}
          columnWrapperStyle={{
            flexWrap: "wrap",
            width: "100%",
          }}
          initialNumToRender={10}
        />
      )}
    </View>
  );
}
