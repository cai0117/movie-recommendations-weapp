import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Input,
  InputProps,
  BaseEventOrig,
} from "@tarojs/components";
import BasePage from "@/components/base-page";
import SEARCHICON from "@/images/search.png";
import styles from "./index.module.less";

const MovieClassificationPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const hanldeInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    setSearchValue(e.detail.value);
  };

  return (
    <BasePage
      headerSearchView={() => (
        <View className={styles.search}>
          <View className={styles.icon}>
            <Image
              className={styles.searchIcon}
              src={SEARCHICON}
              mode="widthFix"
            />
          </View>
          <Input
            className={styles.input}
            placeholder="输入"
            focus
            onBlur={hanldeInput}
          />
        </View>
      )}
    >
      <Text>Hello world!</Text>
    </BasePage>
  );
};
export default MovieClassificationPage;
