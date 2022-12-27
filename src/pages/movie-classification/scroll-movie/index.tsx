import React from "react";
import { ScrollView } from "@tarojs/components";
import styles from "./index.module.less";
import MovieItem from "../movie-item";

type Props = {};
const ScrollMovie: React.FC<Props> = (props) => {
  return (
    <ScrollView className={styles.scroll} scrollY>
      <MovieItem />
    </ScrollView>
  );
};
export default React.memo(ScrollMovie);
