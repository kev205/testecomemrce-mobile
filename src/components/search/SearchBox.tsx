import { FC, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Searchbar } from "react-native-paper";

export const SearchBox: FC<{ onChange: any }> = ({}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 5,
      }}
    >
      <Searchbar
        ref={inputRef}
        value={inputValue}
        placeholder="Type something"
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        style={{ flex: 1, marginRight: 2.5 }}
      />
    </View>
  );
};
