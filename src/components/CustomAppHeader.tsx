import React from "react";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";

type CustomAppHeaderProps = NativeStackHeaderProps & {
  actions?: {
    key: string;
    icon: any;
    onPress?: any;
  }[];
};

const CustomAppHeader = (props: CustomAppHeaderProps) => (
  <Appbar.Header mode="small">
    <Appbar.BackAction onPress={router.back} />
    <Appbar.Content title={props.options.title} />
    {props.actions?.map((action) => (
      <Appbar.Action
        key={action.key}
        icon={(p) => action.icon && action.icon(p)}
        rippleColor="transparent"
        onPress={action.onPress}
        animated={false}
        size={22}
      />
    ))}
  </Appbar.Header>
);

export default CustomAppHeader;
