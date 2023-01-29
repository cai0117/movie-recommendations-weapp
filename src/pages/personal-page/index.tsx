import React from "react";
import { View, Image, Text } from "@tarojs/components";
import BasePage from "@/components/base-page";
import { useAppSelector } from "@/redux/hooks";
import styles from "./index.module.less";
import FancyMovieItem from "./fancy-movie-item";

const PersonalPage = () => {
  const { avatarUrl, name } = useAppSelector((state) => state.user);
  return (
    <BasePage className={styles.page}>
      <View className={styles.userInfo}>
        <View className={styles.user}>
          <Image src={avatarUrl} mode="aspectFill" className={styles.avatar} />
          <Text className={styles.name}>{name}</Text>
        </View>
      </View>
      <View className={styles.content}>
        <Text className={styles.line}>动态</Text>
        <View className={styles.info}>
          <FancyMovieItem />
        </View>
      </View>
    </BasePage>
  );
};
export default PersonalPage;
