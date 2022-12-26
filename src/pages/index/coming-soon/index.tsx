import React from "react";
import { ScrollView, Image, View, Text, Button } from "@tarojs/components";
import EXAMPLE from "@/images/coupons.png";
import RIGHT_ARROW from "@/images/right_arrow.png";
import styles from "./index.module.less";

type Props = {};

const ComingSoon: React.FC<Props> = (props) => {
  return (
    <View className={styles.container}>
      <View className={styles.info}>
        <Text className={styles.hot}>即将上映</Text>
        <View className={styles.goHot}>
          <Text>全部19部</Text>
          <Image src={RIGHT_ARROW} mode="aspectFit" className={styles.arrow} />
        </View>
      </View>
      <ScrollView className={styles.scrollY} scrollX>
        <View className={styles.imgView}>
          <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
          <Text className={styles.title}>阿凡达</Text>
          <Text className={styles.time}>12月31</Text>
          <Button className={styles.buyer}>预售</Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(ComingSoon);
