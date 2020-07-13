import React, { useContext } from "react";
import { SvgProps } from "react-native-svg";
import { Dimensions, StyleProp, Text, TextStyle, View, ViewStyle, TouchableWithoutFeedback } from "react-native";

import { ThemeContext } from "@themes/buildThemeContext";
import { CreateStyles } from "@themes/createStyles";
import { Media } from "@components/Media";
import { LetterIcon } from "@components/LetterIcon";
import { RouteName } from "@navigation/routes";
import { useNavigation, NavigationParam } from "@navigation/hooks/useNavigation";

import { ListItemProps } from "../ListItemProps";

import { BaseListItem } from "./BaseListItem";

export type IconListItemProps = ListItemProps & {
  readonly variant: "icon";
  readonly linkTo?: RouteName;
  readonly linkToParams?: NavigationParam<RouteName>;
  readonly accessibilityLabel: string;
  readonly accessibilityHint?: string;
  readonly infoText?: string;
  readonly icon?: React.ComponentClass<SvgProps>;
};

export const IconListItem: React.FC<IconListItemProps> = ({
  title,
  subtitle,
  icon,
  testID,
  linkTo,
  linkToParams,
  accessibilityLabel,
  accessibilityHint,
  infoText,
}) => {
  const navigation = useNavigation();

  const { tokens } = useContext(ThemeContext);
  const styles = createStyles(tokens);

  const [active, setActive] = React.useState(false);
  const handlePressIn = (): void => setActive(true);
  const handlePressOut = (): void => setActive(false);

  const [focused, setFocused] = React.useState(false);
  const handleFocus = (): void => setFocused(true);
  const handleBlur = (): void => setFocused(false);

  const handlePress = (): void => {
    if (!linkTo) {
      return;
    }
    navigation.navigate(linkTo, linkToParams);
  };
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={"link"}
      accessibilityState={{ disabled: false }}
      disabled={linkTo === undefined}
      testID={testID}
    >
      <View>
        <BaseListItem testID={testID} active={active} focused={focused}>
          <View style={[styles.leftAlignedRow]}>
            {icon ? (
              <View style={styles.iconContainer}>
                <Media
                  accessibilityLabel="logo"
                  width={tokens.spacing.horizontal.xl}
                  height={tokens.spacing.vertical.xl}
                  source={icon}
                  isSVG={true}
                />
              </View>
            ) : (
              <LetterIcon letter={title} />
            )}
            <View style={[styles.column]}>
              <View style={[styles.leftAlignedRow]}>
                <Text style={[styles.text]}>{title}</Text>
                {infoText && <Text style={styles.infoText}>{infoText}</Text>}
              </View>
              <Text style={[styles.textSubtitle]}>{subtitle}</Text>
            </View>
          </View>
        </BaseListItem>
      </View>
    </TouchableWithoutFeedback>
  );
};

type ListItemStyles = {
  readonly iconContainer: ViewStyle;
  readonly leftAlignedRow: StyleProp<ViewStyle>;
  readonly column: StyleProp<ViewStyle>;
  readonly text: StyleProp<TextStyle>;
  readonly textSubtitle: StyleProp<TextStyle>;
  readonly infoText: StyleProp<TextStyle>;
};

const createStyles: CreateStyles<ListItemStyles> = tokens => {
  const { fontScale } = Dimensions.get("window");
  const { spacing, size, font, color } = tokens;
  return {
    iconContainer: {
      overflow: "hidden",
      borderRadius: tokens.size.radius.default,
    },
    leftAlignedRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    column: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingHorizontal: spacing.horizontal.large,
    },
    text: {
      fontSize: size.font.regular * fontScale,
      fontWeight: font.weight.regular as "500",
      lineHeight: font.lineheight.body * fontScale,
    },
    textSubtitle: {
      fontSize: size.font.tiny * fontScale,
      color: color.font.secondary,
    },
    infoText: {
      right: 0,
      position: "absolute",
      fontSize: tokens.size.font.tiny,
      color: tokens.color.font.secondary,
    },
  };
};
