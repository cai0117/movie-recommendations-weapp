import React, { useState } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import BasePage from "@/components/base-page";
import SEARCHICON from "@/images/search.png";
import ARROWDOWN from "@/images/arrow-down.png";
import ARROWUP from "@/images/arrow-up.png";
import styles from "./index.module.less";
import SelectView from "./select-view";
import ScrollMovie from "./scroll-movie";

const MovieClassificationPage = () => {
  const [confirmSelect, setConfirmSelect] = useState<boolean>(false);

  return (
    <BasePage
      className={styles.page}
      headerClassName={styles.headerStyle}
      headerLeftComponent={() => (
        <View
          className={styles.selectContainer}
          onClick={() => setConfirmSelect((pre) => !pre)}
        >
          <Text className={confirmSelect ? styles.beSelect : styles.select}>
            筛选
          </Text>
          <Image
            className={styles.arrow}
            src={confirmSelect ? ARROWUP : ARROWDOWN}
            mode="widthFix"
          />
        </View>
      )}
      headerSearchView={() => (
        <View className={styles.search}>
          <View className={styles.icon}>
            <Image
              className={styles.searchIcon}
              src={SEARCHICON}
              mode="widthFix"
            />
          </View>
          <Input className={styles.input} placeholder="输入" focus />
        </View>
      )}
    >
      <SelectView
        confirmSelect={confirmSelect}
        setConfirmSelect={setConfirmSelect}
      />
      <ScrollMovie />
    </BasePage>
  );
};
export default MovieClassificationPage;
