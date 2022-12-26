import React from "react";
import { Image, View } from "@tarojs/components";
import TIKICT from "@/images/tikict.png";
import RECORD from "@/images/record.png";
import styles from "./index.module.less";

type Props = {};

const Operation: React.FC<Props> = (props) => {
  return (
    <View className={styles.container}>
      <View className={styles.tikict}>
        <Image src={TIKICT} mode="aspectFill" className={styles.tikImg} />
        <View>电影票</View>
      </View>
      <View className={styles.record}>
        <Image src={RECORD} mode="aspectFill" className={styles.tikImg} />
        <View>收藏记录</View>
      </View>
    </View>
  );
};

export default React.memo(Operation);
