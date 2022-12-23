import React from "react";
import { View } from "@tarojs/components";
import styles from "./index.module.less";

type Props = Partial<{
  className: string;
  maskClassName: string;
  spinClassName: string;
}>;

const Spin: React.FC<Props> = props => {
  const { className = "", maskClassName = "", spinClassName = "" } = props;
  return (
    <View className={`${styles.container} ${className}`}>
      <View className={`${styles.mask} ${maskClassName}`}></View>
      <View className={`${styles.spin} ${spinClassName}`}></View>
    </View>
  );
};

export default React.memo(Spin);
