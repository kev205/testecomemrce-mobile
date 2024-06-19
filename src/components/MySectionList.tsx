import { FC, memo } from "react";
import { Pressable, ScrollView, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ForwardButton from "@/components/ForwardButton";

const MySectionList: FC<{
  title?: string;
  items: any[];
  hasMore?: boolean;
  onMore?: any;
  display?: "grid" | "list";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  renderItem?: any;
  contentContainerStyle?: ViewStyle;
  gridSize?: number;
}> = ({
  title = "",
  items,
  hasMore,
  onMore,
  display = "grid",
  flexDirection,
  renderItem,
  contentContainerStyle,
  gridSize = 3,
}) => {
  const { colors } = useTheme();

  const renderFunction = (value: any, index: number) => {
    return renderItem && renderItem({ item: value, index });
  };

  const renderRows = (items: any[]) => {
    const rows: any[] = [];
    for (let i = 0; i < items.length; i += gridSize) {
      rows.push(
        <View
          key={i}
          style={{
            flexDirection: flexDirection,
          }}
        >
          {items.slice(i, i + gridSize).map(renderFunction)}
        </View>
      );
    }

    return rows;
  };

  return (
    <View style={[{ flex: 1 }, contentContainerStyle]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
        {hasMore && (
          <Pressable style={{ padding: 5 }} onPress={onMore}>
            <ForwardButton color={colors.onBackground} size={16} />
          </Pressable>
        )}
      </View>
      {display === "list" ? (
        <ScrollView
          horizontal={
            flexDirection === "row" || flexDirection === "row-reverse"
          }
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingVertical: 5,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {items.map(renderFunction)}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {renderRows(items)}
        </View>
      )}
    </View>
  );
};

export default memo(MySectionList);
