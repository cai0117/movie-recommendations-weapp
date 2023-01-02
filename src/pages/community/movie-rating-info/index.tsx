import React from "react";
import Taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import { Movie } from "@/api/movie";
import { formatEvoNum } from "@/util/common";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};

const MovieRatingInfo: React.FC<Props> = (props) => {
  const { data } = props;
  const goMovieDetail = (id: number) => {
    Taro.navigateTo({ url: `/pages/movie-info/index?id=${id}` });
  };
  return (
    <View
      className={styles.content}
      onClick={() => goMovieDetail(data.movieId)}
    >
      <View className={styles.communityContainer}>
        <Image src={data.cover} mode="aspectFill" className={styles.img} />
        <View className={styles.info}>
          <View className={styles.title}>{data.title}</View>
          <View className={styles.point}>导演：{data.director}</View>
          <View className={styles.point}>主演：{data.protagonist}</View>
        </View>
        <View className={styles.pub}>
          <View className={styles.evo}>{data.rate}</View>
          <View className={styles.man}>
            {formatEvoNum(data.evaluateNum)}人评价
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(MovieRatingInfo);
