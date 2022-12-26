import React from "react";
import { ScrollView } from "@tarojs/components";
import styles from "./index.module.less";
import MoiveItem from "../moive-item";

type Props = {};
const ScrollMovie: React.FC<Props> = (props) => {
  return (
    <ScrollView className={styles.scroll} scrollY>
      <MoiveItem />
    </ScrollView>
  );
};
export default React.memo(ScrollMovie);
