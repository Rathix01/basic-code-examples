/*
 * Copyright 2019 - MATTR Limited
 * All rights reserved
 * Confidential and proprietary
 */
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleProp, View, ViewStyle } from "react-native";

import { ThemeContext } from "@themes/buildThemeContext";
import { CreateStyles } from "@themes/createStyles";
import { conditionalStyle } from "@themes/conditionalStyle";

import { SelectedIcon } from "./SelectedIcon";

type OnPress = () => void;

export type RadioGroupListItemProps = {
  readonly selected: boolean;
  readonly onPress: OnPress;
};

type RadioGroupItemComponent = React.FC<RadioGroupListItemProps>;

export const RadioGroupItem: RadioGroupItemComponent = props => {
  const { selected, onPress, children } = props;

  const { tokens } = React.useContext(ThemeContext);
  const styles = createStyles(tokens);

  const rowStyle = conditionalStyle(styles, {
    selectedRow: selected,
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={[styles.row, rowStyle]}>
        <View style={styles.children}>{children}</View>
        <SelectedIcon selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

type ListItemStyles = {
  readonly row: StyleProp<ViewStyle>;
  readonly selectedRow: StyleProp<ViewStyle>;
  readonly children: StyleProp<ViewStyle>;
  readonly selection: StyleProp<ViewStyle>;
  readonly selectionInner: StyleProp<ViewStyle>;
};

const createStyles: CreateStyles<ListItemStyles> = tokens => {
  const { size, color, spacing, brand } = tokens;
  return {
    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: spacing.horizontal.large,
      borderRadius: size.radius.default,
      borderWidth: size.border.small,
      borderColor: color.border.base,
      marginVertical: spacing.vertical.default,
    },
    selectedRow: {
      borderColor: brand.interaction.default,
    },
    children: {
      flex: 1,
    },
    selection: {
      height: tokens.size.icon.large,
      width: tokens.size.icon.large,
      borderRadius: tokens.size.radius.xl,
      borderWidth: tokens.size.border.regular,
      borderColor: tokens.brand.interaction.default,
      alignItems: "center",
      justifyContent: "center",
    },
    selectionInner: {
      height: tokens.size.icon.small,
      width: tokens.size.icon.small,
      borderRadius: tokens.size.radius.xl,
      backgroundColor: tokens.brand.interaction.default,
    },
  };
};
