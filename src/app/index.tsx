import { Redirect } from "expo-router";
const localizedFormat = require("dayjs/plugin/localizedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
import dayjs from "dayjs";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
import "dayjs/locale/fr";
import "dayjs/locale/en";

export const favoriteCategory = process.env.EXPO_PUBLIC_TOP_CATEGORY ?? "";

export default function Root() {
  return <Redirect href="/(app)/(tabs)/home" />;
}
