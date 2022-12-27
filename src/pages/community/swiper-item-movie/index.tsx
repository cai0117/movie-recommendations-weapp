import React from "react";
import { ScrollView } from "@tarojs/components";
import styles from "./index.module.less";
import MovieRatingInfo from "../movie-rating-info";

type Props = {};

const SwiperItemMovie: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <ScrollView className={styles.container} scrollY>
      <MovieRatingInfo />
    </ScrollView>
  );
};

export default React.memo(SwiperItemMovie);
