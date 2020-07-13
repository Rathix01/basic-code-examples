/*
 * Copyright 2019 - MATTR Limited
 * All rights reserved
 * Confidential and proprietary
 */
import * as React from "react";
import { View } from "react-native";

import { RadioGroupItem } from "@components/RadioGroup/RadioGroupItem";

type GetKeyFn<T> = (item: T) => string;

type OnChange = (key: string) => void;

type RadioGroupProps<Item> = {
  readonly items: readonly Item[];
  readonly selectedKey: string;
  readonly onChange: OnChange;
  readonly getKey: GetKeyFn<Item>;
  readonly component: React.ComponentType<Item>;
};

type Props<T> = React.PropsWithChildren<RadioGroupProps<T>>;

export function RadioGroup<Item = {}>(props: Props<Item>): React.ReactElement {
  const { selectedKey, items, getKey, onChange } = props;
  const handlePress = React.useCallback((key: string) => () => onChange(key), [onChange]);
  return (
    <View>
      {items.map(item => {
        const key = getKey(item);
        return (
          <RadioGroupItem key={key} selected={key === selectedKey} onPress={handlePress(key)}>
            <props.component {...item} />
          </RadioGroupItem>
        );
      })}
    </View>
  );
}
