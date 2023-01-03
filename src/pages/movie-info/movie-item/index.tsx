import React, { useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import { formatDate } from "@/util/common";
import { Movie } from "@/api/movie";
import SEEMWATCH from "@/images/seem_watch.png";
import SEEMED from "@/images/seemed.png";
import styles from "./index.module.less";

type Props = {
  data: Movie;
};
const MovieItem: React.FC<Props> = (props) => {
  const { data } = props;
  const [seem, setSeem] = useState<boolean>(false);

  const handleClick = () => {
    setSeem((pre) => !pre);
  };
  return (
    <View className={styles.container}>
      <Image src={data.cover} mode="aspectFill" className={styles.img} />
      <View className={styles.info}>
        <Text className={styles.title}>{data.title}</Text>
        <Text className={styles.type}>
          {data.type ? data.type.split("/").join(" ") : ""}
        </Text>
        <Text className={styles.time}>
          上映日期：
          {data.release || data.comingData
            ? formatDate(data.release ?? data.comingData, false)
            : ""}
        </Text>
        <Text className={styles.time}>
          电影时长：{data.movieTime ? data.movieTime : "暂无"}
        </Text>
        <View className={styles.click}>
          <View
            className={seem ? styles.hideBack : styles.back}
            onClick={handleClick}
          >
            {seem ? null : (
              <Image src={SEEMWATCH} mode="aspectFit" className={styles.icon} />
            )}
            <Text>{seem ? "已看过" : "想看"}</Text>
          </View>
          <View className={styles.size} />
          <View className={styles.back}>
            <Image src={SEEMED} mode="aspectFit" className={styles.icon} />
            <Text>看过</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(MovieItem);
