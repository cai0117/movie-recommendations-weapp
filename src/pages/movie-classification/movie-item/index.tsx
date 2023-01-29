import React from "react";
import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { Movie } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const MovieItem: React.FC<Props> = (props) => {
  const { data } = props;
  const goMovieDetail = (id: number) => {
    Taro.navigateTo({ url: `/pages/movie-info/index?id=${id}` });
  };
  return (
    <View
      className={styles.content}
      onClick={() => goMovieDetail(data.movieId)}
    >
      <View className={styles.container}>
        <Image src={data.cover} mode="aspectFill" className={styles.img} />
        <View className={styles.info}>
          <View className={styles.title}>{data.title}</View>
          <View className={styles.point}>评分 {data.rate}</View>
          <View className={styles.point}>主演:{data.protagonist}</View>
        </View>
        {/* <Button className={styles.goBuy}>购票</Button> */}
      </View>
    </View>
  );
};
export default React.memo(MovieItem);
