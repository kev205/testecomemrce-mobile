import { Redirect } from "expo-router";
const localizedFormat = require("dayjs/plugin/localizedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
import dayjs from "dayjs";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import "dayjs/locale/fr";
import "dayjs/locale/en";
import { usePrefetch } from "@/services/products";

export const favoriteCategory = process.env.EXPO_PUBLIC_TOP_CATEGORY ?? "";

export default function Root() {
  const prefetchTopProducts = usePrefetch("topProducts", { ifOlderThan: 300 });
  const prefetchFavoritesCategory = usePrefetch("productsOfFavoriteCategory", {
    ifOlderThan: 300,
  });

  prefetchTopProducts({
    page: {
      skip: 0,
      limit: 5,
    },
    sortBy: "meta.creadtedAt",
    order: "desc",
    select: "id,category,title,description,thumbnail",
  });
  prefetchFavoritesCategory({
    category: favoriteCategory,
    page: {
      skip: 0,
      limit: 12,
    },
    select: "id,title,thumbnail,category,brand,price,discountPercentage",
  });

  return <Redirect href="/(app)/(tabs)/home" />;
}
