import React from "react";
import { Image, View, Text } from "@tarojs/components";
import RIGHT_ARROW from "@/images/right_arrow.png";
import styles from "./index.module.less";

type Props = {};

const WatchMovie: React.FC<Props> = (props) => {
  return (
    <View className={styles.container}>
      <View className={styles.tikict}>
        <View className={styles.font}>
          <Text className={styles.num}>2</Text>
          <Text className={styles.word}>想看</Text>
        </View>
        <View className={styles.div}>
          <Image src={RIGHT_ARROW} mode="aspectFit" className={styles.arrow} />
          <Text className={styles.diliver} />
        </View>
      </View>
      <View className={styles.record}>
        <View className={styles.font}>
          <Text className={styles.num}>5</Text>
          <Text className={styles.word}>看过</Text>
        </View>
        <Image src={RIGHT_ARROW} mode="aspectFit" className={styles.arrow} />
      </View>
    </View>
  );
};

export default React.memo(WatchMovie);
