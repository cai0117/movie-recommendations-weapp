import React from "react";
import { View, Image, Text } from "@tarojs/components";
import BasePage from "@/components/base-page";
import { useAppSelector } from "@/redux/hooks";
import Taro from "@tarojs/taro";
import RIGHT_ARROW from "@/images/right_arrow.png";
import Operation from "./operation";
import styles from "./index.module.less";
import WatchMovie from "./watch-movie";

const MinePage = () => {
  const { avatarUrl, name } = useAppSelector((state) => state.user);

  const goPersonal = () => {
    Taro.navigateTo({ url: "/pages/personal-page/index" });
  };
  return (
    <BasePage className={styles.page} goBack={() => null}>
      <View className={styles.userInfo}>
        <View className={styles.user}>
          <Image src={avatarUrl} mode="aspectFill" className={styles.avatar} />
          <Text className={styles.name}>{name}</Text>
        </View>
        <View className={styles.userHome} onClick={goPersonal}>
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
