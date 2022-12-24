import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Input,
  BaseEventOrig,
  InputProps,
} from "@tarojs/components";
import BasePage from "@/components/base-page";
import downImg from "@/images/down.svg";
import SEARCHICON from "@/images/search.png";
import styles from "./index.module.less";

const Index = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const goCityList = () => {
    // Taro.navigateTo({
    //   url: "/pages/city/index",
    //   events: {
    //     getRegion: async region => {
    //       const payload = await getStoreUnitList({
    //         size: 30,
    //         current: 1,
    //         input: { cityRegionId: region.regionId }
    //       }).unwrap();
    //       setStoreUnitList(payload.records);
    //       setAdCity(region.regionName);
    //     }
    //   }
    // });
  };

  const hanldeInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    setSearchValue(e.detail.value);
  };
  return (
    <BasePage
      headerLeftComponent={() => (
        <View className={styles.city} onClick={goCityList}>
          <Text className={styles.text}>厦门市</Text>
          <Image className={styles.down} src={downImg} mode="widthFix" />
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
export default Index;
