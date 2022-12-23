import React, { useMemo } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./index.module.less";

type Props = React.PropsWithChildren<
  Partial<{
    className: string;
    showShadow: boolean;
  }>
>;

const SafeAreaFooter: React.FC<Props> = props => {
  const { className = "", children, showShadow = true } = props;

  const safeAreaHeight = useMemo(() => {
    let systemInfo = Taro.getSystemInfoSync();
    return systemInfo.safeArea
      ? systemInfo.screenHeight -
          systemInfo.safeArea.top -
          systemInfo.safeArea.height
      : 0;
  }, []);

  return (
    <View
      className={`${className} ${styles.container} 
                ${showShadow && styles.shadow}`}
      style={{
        paddingBottom: Math.max(safeAreaHeight, 10)
      }}
    >
      {children}
    </View>
  );
};

export default React.memo(SafeAreaFooter);
