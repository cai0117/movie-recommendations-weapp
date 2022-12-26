import React from "react";
import { View, Image, Button, Text } from "@tarojs/components";
import EXAMPLE from "@/images/coupons.png";
import styles from "./index.module.less";

type Props = {};
const MovieItem: React.FC<Props> = (props) => {
  return (
    <View className={styles.content}>
      <View className={styles.container}>
        <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
        <View className={styles.info}>
          <View className={styles.title}>阿凡达：水之道</View>
          <View className={styles.point}>评分 9.1</View>
          <View className={styles.point}>主演:萨姆</View>
        </View>
        <Button className={styles.goBuy}>购票</Button>
      </View>
    </View>
  );
};
export default React.memo(MovieItem);
