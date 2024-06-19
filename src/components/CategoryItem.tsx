import { router } from "expo-router";
import { Chip } from "react-native-paper";

export default function CategoryItem({ item }: { item: any }) {
  const onPress = () =>
    router.navigate(`/(app)/category/${item.slug}?name=${item.name}`);

  return (
    <Chip mode="flat" style={{ margin: 4 }} onPress={onPress}>
      {item.name}
    </Chip>
  );
}
