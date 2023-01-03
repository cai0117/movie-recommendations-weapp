import React from "react";
import { View, Text } from "@tarojs/components";
import { Movie } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const Commend: React.FC<Props> = (props) => {
  const { data } = props;
  if (!data.hotShortCommend) return null;
  return (
    <View className={styles.container}>
      <Text className={styles.hot}>{data.hotShortCommend}</Text>
    </View>
  );
};

export default React.memo(Commend);
