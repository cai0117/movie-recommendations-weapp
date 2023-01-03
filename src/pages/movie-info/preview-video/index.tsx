import React from "react";
import { View, Text, Video } from "@tarojs/components";
import { Movie } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const PreviewVideo: React.FC<Props> = (props) => {
  const { data } = props;
  if (!data.preview) return null;
  return (
    <View className={styles.container}>
      <Text className={styles.staff}>预告片</Text>
      <Video src={data.preview} initialTime={0} poster={data.cover} />
    </View>
  );
};

export default React.memo(PreviewVideo);
