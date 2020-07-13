/*
 * Copyright 2019 - MATTR Limited
 * All rights reserved
 * Confidential and proprietary
 */
import * as React from "react";
import { View, ViewStyle } from "react-native";

import { ThemeContext } from "@themes/buildThemeContext";
import { CreateStyles } from "@themes/createStyles";
import { conditionalStyle } from "@themes/conditionalStyle";

type SelectedIconProps = {
  readonly selected: boolean;
};

export const SelectedIcon: React.FC<SelectedIconProps> = ({ selected }) => {
  const { tokens } = React.useContext(ThemeContext);
  const styles = createStyles(tokens);

  const selectedOuter = conditionalStyle(styles, { selectedOuter: selected });
  const selectedInner = conditionalStyle(styles, { selectedInner: selected });

  return (
    <View style={[styles.outer, selectedOuter]}>
      <View style={[styles.inner, selectedInner]} />
    </View>
  );
};

type SelectedIconStyles = {
  readonly outer: ViewStyle;
  readonly inner: ViewStyle;
  readonly selectedOuter: ViewStyle;
  readonly selectedInner: ViewStyle;
};

const createStyles: CreateStyles<SelectedIconStyles> = tokens => {
  return {
    outer: {
      height: tokens.size.icon.large,
      width: tokens.size.icon.large,
      borderRadius: tokens.size.radius.xl,
      borderWidth: tokens.size.border.regular,
      borderColor: tokens.brand.neutral[700],
      alignItems: "center",
      justifyContent: "center",
    },
    inner: {
      height: tokens.size.icon.small,
      width: tokens.size.icon.small,
      borderRadius: tokens.size.radius.xl,
    },
    selectedOuter: {
      borderColor: tokens.color.border.interaction,
    },
    selectedInner: {
      backgroundColor: tokens.brand.interaction.default,
      borderRadius: tokens.size.radius.xl,
    },
  };
};
