import React from "react";
import { View, Text, Image } from "@tarojs/components";
import { Movie } from "@/api/movie";
import AVATAR from "@/images/avatar.jpg";
import BOUTIQUE from "@/images/boutique.png";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const Commend: React.FC<Props> = (props) => {
  const { data } = props;
  if (!data.hotShortCommend) return null;
  return (
    <View className={styles.container}>
      <Text className={styles.staff}>精品影评</Text>
      <View className={styles.content}>
        <View className={styles.person}>
          <Image src={AVATAR} mode="aspectFill" className={styles.avatar} />
          <Text className={styles.name}>
            小影迷{Math.floor(Math.random() * 10000)}
          </Text>
        </View>
        <View className={styles.info}>
          <Image src={BOUTIQUE} mode="aspectFill" className={styles.img} />
          <Text className={styles.hot}>{data.hotShortCommend}</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Commend);
