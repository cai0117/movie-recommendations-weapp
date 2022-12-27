import React from "react";
import { ScrollView, Image, View } from "@tarojs/components";
import EXAMPLE from "@/images/coupons.png";
import styles from "./index.module.less";

type Props = {};

const SwiperItemMovie: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.content}>
        <View className={styles.communityContainer}>
          <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
          <View className={styles.info}>
            <View className={styles.title}>阿凡达：水之道</View>
            <View className={styles.point}>豆瓣评分 9.1</View>
            <View className={styles.publish}>精品影评</View>
            <View className={styles.point}>
              刑天:这部电影堪称史上最大3DMax巨作
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default React.memo(SwiperItemMovie);
