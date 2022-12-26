import React from "react";
import { View, Image, Text } from "@tarojs/components";
import BasePage from "@/components/base-page";
import EXAMPLE from "@/images/coupons.png";
import RIGHT_ARROW from "@/images/right_arrow.png";
import Operation from "./operation";
import styles from "./index.module.less";
import WatchMovie from "./watch-movie";

const MinePage = () => {
  return (
    <BasePage className={styles.page}>
      <View className={styles.userInfo}>
        <View className={styles.user}>
          <Image src={EXAMPLE} mode="aspectFill" className={styles.avatar} />
          <Text className={styles.name}>@sole</Text>
        </View>
        <View className={styles.userHome}>
          个人主页
          <Image src={RIGHT_ARROW} mode="aspectFit" className={styles.arrow} />
        </View>
      </View>
      <WatchMovie />
      <Operation />
    </BasePage>
  );
};
export default MinePage;
