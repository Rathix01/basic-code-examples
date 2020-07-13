/*
 * Copyright 2019 - MATTR Limited
 * All rights reserved
 * Confidential and proprietary
 */
import React from "react";
import { SafeAreaView } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { ListRenderItem, RefreshControl, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import { CreateStyles } from "@themes/createStyles";
import { useStyleTokens } from "@themes/buildThemeContext";
import { Header } from "@components/Header";
import { Media } from "@components/Media";
import { normalizeFontSize } from "@utils/normaliseFontSize";
import { InteractionRecord } from "@screens/InteractionListScreen";
import { ParsedCredential } from "@services/mobileStorage/DataProviders/credentials";
import { conditionalStyle } from "@themes/conditionalStyle";

type KeyExtractorFn = (item: any) => string;
type OnRefreshFn = () => void;
type EntityListPageProps = {
  /**
   * Header od the list to show when entities exist
   */
  readonly headerText: string;

  /**
   * Array of data for listing
   */
  readonly data: readonly object[];

  /**
   * Function to render an item from data
   */
  readonly renderItem: ListRenderItem<any>;
  readonly keyExtractor: KeyExtractorFn;
  readonly refreshing?: boolean;
  readonly onRefresh?: OnRefreshFn;

  /**
   * Placeholder properties to show when data is empty
   */
  readonly placeholderSource: React.ComponentClass<SvgProps>;
  readonly placeholderMessage: string;
  readonly placeholderDescription: string;
  readonly placeholderAccessibilityLabel: string;
};

/**
 * A component that uses a flat list to render a list of entities
 * On empty, an empty state with a centered image and text are shown
 */
type EntityListPageComponent<T = InteractionRecord | ParsedCredential> = React.FC<EntityListPageProps>;
export const EntityListPage: EntityListPageComponent = props => {
  const {
    children,
    data,
    headerText,
    keyExtractor,
    renderItem,
    refreshing = false,
    placeholderSource,
    onRefresh,
    placeholderMessage,
    placeholderDescription,
    placeholderAccessibilityLabel,
  } = props;
  const tokens = useStyleTokens();
  const styles = createStyles(tokens);

  const emptyListStyle = conditionalStyle(styles, {
    emptyListContainer: data.length === 0,
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={data.length > 0 ? <Header title={headerText} /> : <></>}
        stickyHeaderIndices={[0]}
        contentContainerStyle={[emptyListStyle]}
        scrollEnabled
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
        ListEmptyComponent={
          <View style={styles.placeholderContainer}>
            <Media
              source={placeholderSource}
              isSVG={true}
              width={160}
              height={160}
              accessibilityLabel={placeholderAccessibilityLabel}
            />
            <Text style={styles.message}>{placeholderMessage}</Text>
            <Text style={styles.description}>{placeholderDescription}</Text>
          </View>
        }
      />
      {children}
    </SafeAreaView>
  );
};

type EntityListPageStyles = {
  readonly container: ViewStyle;
  readonly placeholderContainer: ViewStyle;
  readonly message: TextStyle;
  readonly description: TextStyle;
  readonly emptyListContainer: ViewStyle;
};

const createStyles: CreateStyles<EntityListPageStyles> = tokens =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: tokens.spacing.vertical.large,
      backgroundColor: tokens.color.background.default,
    },
    emptyListContainer: {
      flex: 1,
    },
    placeholderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: tokens.color.background.default,
    },
    message: {
      fontSize: normalizeFontSize(tokens.size.font.large),
      fontWeight: tokens.font.weight.bold,
      paddingTop: tokens.spacing.vertical.xl,
      paddingBottom: tokens.spacing.vertical.large,
      paddingHorizontal: tokens.spacing.horizontal.xxl,
      textAlign: "center",
    },
    description: {
      fontSize: normalizeFontSize(tokens.size.font.regular),
      color: tokens.color.font.secondary,
      paddingHorizontal: tokens.spacing.horizontal.xxl,
      textAlign: "center",
    },
  });
