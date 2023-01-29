import React from "react";
import { View, Image, Text } from "@tarojs/components";
import CANCEL from "@/images/cancel.png";
import styles from "./index.module.less";

const FancyMovieItem = () => {
  return (
    <View className={styles.itemInfo}>
      <View className={styles.container}>
        <View className={styles.head}>
          <Text className={styles.fancy}>想看电影</Text>
          <Image src={CANCEL} mode="aspectFit" className={styles.cancel} />
        </View>
        <View className={styles.info}>
          <Image
            src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.jpg"
            mode="aspectFill"
            className={styles.movie}
          />
          <View className={styles.movieInfo}>
            <Text className={styles.fancy}>复仇者联盟</Text>
            <Text className={styles.text}>动作，冒险</Text>
            <Text className={styles.text}>美国/181分钟</Text>
          </View>
        </View>
        <Text className={styles.time}>2018-11-19</Text>
      </View>
    </View>
  );
};
export default React.memo(FancyMovieItem);
