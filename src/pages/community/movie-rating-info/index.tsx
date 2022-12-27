import React from "react";
import { Image, View } from "@tarojs/components";
import EXAMPLE from "@/images/coupons.png";
import styles from "./index.module.less";

type Props = {};

const MovieRatingInfo: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <View className={styles.content}>
      <View className={styles.communityContainer}>
        <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
        <View className={styles.info}>
          <View className={styles.title}>阿凡达：水之道</View>
          <View className={styles.point}>导演：詹姆斯·卡梅隆</View>
          <View className={styles.point}>主演：史蒂夫</View>
        </View>
        <View className={styles.pub}>
          <View className={styles.evo}>8.1</View>
          <View className={styles.man}>9.1万人评价</View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(MovieRatingInfo);
