import { View } from "@tarojs/components";

import React from "react";
import Spin from "../spin";
import styles from "./index.module.less";

type Props = React.PropsWithChildren<
  Partial<{
    isOpen: boolean;
    handlePicker: () => void;
    isLoading: boolean;
  }>
>;

const PickerDown: React.FC<Props> = props => {
  const { isOpen, handlePicker, children, isLoading } = props;

  return (
    <View className={isOpen ? styles.container : styles.hidden}>
      <View className={styles.showFlutter} onClick={handlePicker}></View>
      <View className={isOpen ? styles.dailog : styles.hideDailog}>
        <View className={styles.header}>
          {isLoading && <Spin />}
          {children}
        </View>
      </View>
    </View>
  );
};
export default React.memo(PickerDown);
