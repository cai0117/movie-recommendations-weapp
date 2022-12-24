import React, { Component, PropsWithChildren } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import BasePage from "@/components/base-page";
import downImg from "@/images/down.svg";
import styles from "./index.module.less";

const Index = () => {
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
  return (
    <BasePage
      headerLeftComponent={() => (
        <View className={styles.city} onClick={goCityList}>
          <Text className={styles.text}>厦门市</Text>
          <Image className={styles.down} src={downImg} mode="widthFix" />
        </View>
      )}
      headerSearchView={() => (
        <View className={styles.search} onClick={goCityList}>
          <Input />
        </View>
      )}
    >
      <Text>Hello world!</Text>
    </BasePage>
  );
};
export default Index;
