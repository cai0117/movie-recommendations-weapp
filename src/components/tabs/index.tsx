import React, { useEffect, useMemo, useState } from "react";
import Taro from "@tarojs/taro";
import { ITouchEvent, View, Block, BaseTouchEvent } from "@tarojs/components";
import styles from "./index.module.less";

type Props = {
  tabList: { id?: number | string; title?: string }[];
  currentPage: number;
  handleNavBar: (event: ITouchEvent) => void;
};

const Tabs: React.FC<Props> = props => {
  const { tabList, currentPage, handleNavBar } = props;

  const navHeight = useMemo(() => {
    let systemInfo = Taro.getSystemInfoSync();
    let systemWidth = systemInfo.windowWidth || 0; //状态栏的高度
    let titleWidth = systemWidth / tabList.length;
    if (tabList.length > 0 && tabList) return titleWidth;
    return 0;
  }, [tabList]);

  return (
    <View className={styles.navBar}>
      {tabList.map((item, index) => (
        <View
          id={String(index)}
          key={item.id}
          className={currentPage === index ? styles.active : ""}
          onClick={handleNavBar}
        >
          <View
            id={String(index)}
            style={{ width: navHeight, textAlign: "center" }}
          >
            {item.title}
          </View>
        </View>
      ))}
    </View>
  );
};

export default React.memo(Tabs);
