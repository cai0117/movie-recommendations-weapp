import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { Movie } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const Synopsis: React.FC<Props> = (props) => {
  const { data } = props;
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <View className={styles.container}>
      <Text className={styles.staff}>电影简介</Text>
      <View className={styles.content}>
        <Text
          className={expand ? styles.expandActor : styles.actor}
          onClick={() => setExpand((pre) => !pre)}
        >
          {data.synopsis ? data.synopsis : ""}
        </Text>
        <View
          className={expand ? styles.hide : styles.expand}
          onClick={() => setExpand((pre) => !pre)}
        >
          展开
        </View>
      </View>
    </View>
  );
};

export default React.memo(Synopsis);
