import React from "react";
import { View, Text } from "@tarojs/components";
import { Movie } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const StaffInfo: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <View className={styles.container}>
      <Text className={styles.staff}>演职人员</Text>
      <View className={styles.content}>
        <Text className={styles.dir}>导演：{data.director}</Text>
        <Text className={styles.actor}>
          演员：{data.protagonist ? data.protagonist.split("/").join("，") : ""}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(StaffInfo);
