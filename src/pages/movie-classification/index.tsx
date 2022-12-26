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
  const [comfirmSelect, setComfirmSelect] = useState<boolean>(false);

  return (
    <BasePage
      className={styles.page}
      headerClassName={styles.headerStyle}
      headerLeftComponent={() => (
        <View
          className={styles.selectContainer}
          onClick={() => setComfirmSelect((pre) => !pre)}
        >
          <Text className={comfirmSelect ? styles.beSelect : styles.select}>
            筛选
          </Text>
          <Image
            className={styles.arrow}
            src={comfirmSelect ? ARROWUP : ARROWDOWN}
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
        comfirmSelect={comfirmSelect}
        setComfirmSelect={setComfirmSelect}
      />
      <ScrollMovie />
    </BasePage>
  );
};
export default MovieClassificationPage;
