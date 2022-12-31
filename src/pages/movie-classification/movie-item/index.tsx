import React from "react";
import { View, Image, Button } from "@tarojs/components";
import { MovieInfo } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: MovieInfo;
};
const MovieItem: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <View className={styles.content}>
      <View className={styles.container}>
        <Image src={data.cover} mode="aspectFill" className={styles.img} />
        <View className={styles.info}>
          <View className={styles.title}>{data.title}</View>
          <View className={styles.point}>评分 {data.rate}</View>
          <View className={styles.point}>主演:萨姆</View>
        </View>
        <Button className={styles.goBuy}>购票</Button>
      </View>
    </View>
  );
};
export default React.memo(MovieItem);
