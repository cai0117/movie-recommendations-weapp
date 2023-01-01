import React, { useState } from "react";
import {
  Image,
  View,
  ITouchEvent,
  SwiperItem,
  Swiper,
} from "@tarojs/components";
import BasePage from "@/components/base-page";
import Tabs from "@/components/tabs";
import styles from "./index.module.less";
import SwiperItemMovie from "./swiper-item-movie";

const MinePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const tabList = [
    { id: 1, title: "观众推荐" },
    { id: 2, title: "高分神作" },
    { id: 3, title: "自由讨论" },
  ];

  const handleNavBar = (event: ITouchEvent) => {
    setCurrentPage(Number(event.currentTarget.id));
  };

  const handleChange = (event: ITouchEvent) => {
    setCurrentPage(event.detail.current);
  };
  return (
    <BasePage title="社区" isLoading={loading}>
      <View className={styles.page}>
        <Tabs
          tabList={tabList}
          currentPage={currentPage}
          handleNavBar={handleNavBar}
        />
        <Swiper
          className={styles.container}
          current={currentPage}
          onChange={handleChange}
        >
          {tabList.map((res) => (
            <SwiperItem key={res.id}>
              <SwiperItemMovie
                status={Number(res.id)}
                setLoading={setLoading}
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    </BasePage>
  );
};
export default MinePage;
