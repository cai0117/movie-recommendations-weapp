import React from "react";
import { View, Text } from "@tarojs/components";
import { formatPerson } from "@/util/common";
import { Movie } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const SeemItem: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <View className={styles.container}>
      <View className={styles.num}>
        <Text className={styles.person}>
          {data.evaluateNum
            ? formatPerson(data.evaluateNum ?? data.seemNum)
            : ""}
        </Text>
        <Text className={styles.people}>
          人{data.evaluateNum ? "评价" : "想看"}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(SeemItem);
