import React from "react";
import { ScrollView, Image, View, Text, Button } from "@tarojs/components";
import { MovieSoon } from "@/api/movie";
import { formatDate } from "@/util/common";
import RIGHT_ARROW from "@/images/right_arrow.png";
import styles from "./index.module.less";

type Props = {
  data: MovieSoon[];
  goMovieDetail: (id: number) => void;
};

const ComingSoon: React.FC<Props> = (props) => {
  const { data, goMovieDetail } = props;
  return (
    <View className={styles.container}>
      <View className={styles.info}>
        <Text className={styles.hot}>即将上映</Text>
        <View className={styles.goHot}>
          <Text>全部{data.length}部</Text>
          <Image src={RIGHT_ARROW} mode="aspectFit" className={styles.arrow} />
        </View>
      </View>
      <ScrollView className={styles.scrollY} scrollX enableFlex>
        {data.map((res) => (
          <View
            className={styles.imgView}
            key={res.soonId}
            onClick={() => goMovieDetail(res.soonId)}
          >
            <Image src={res.cover} mode="aspectFill" className={styles.img} />
            <Text className={styles.title}>{res.title}</Text>
            <Text className={styles.time}>
              {formatDate(res.comingData, true)}
            </Text>
            <Button className={styles.buyer}>预售</Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(ComingSoon);
