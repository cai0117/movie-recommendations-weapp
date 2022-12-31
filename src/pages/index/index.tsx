import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Input,
  BaseEventOrig,
  InputProps,
} from "@tarojs/components";
import {
  Movie,
  MovieSoon,
  useLazyGetAllHotMovieQuery,
  useLazyGetAllSoonMovieQuery,
} from "@/api/movie";
import BasePage from "@/components/base-page";
import downImg from "@/images/down.svg";
import SEARCHICON from "@/images/search.png";
import styles from "./index.module.less";
import HeaderSwiper from "./header-swiper";
import HotOnline from "./hot-online";
import ComingSoon from "./coming-soon";

const Index = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [getHotMovieTrigger, { isLoading }] = useLazyGetAllHotMovieQuery();
  const [getSoonMovieTrigger, { isLoading: sonnLoading }] =
    useLazyGetAllSoonMovieQuery();
  const hotMovie = useRef<Movie[]>([]);
  const soonMovie = useRef<MovieSoon[]>([]);
  const goCityList = () => {
    // Taro.navigateTo({
    //   url: "/pages/city/index",
    //   events: {
    //     getRegion: async region => {
    //       const payload = await getStoreUnitList({
    //         size: 30,
    //         current: 1,
    //         input: { cityRegionId: region.regionId }
    //       }).unwrap();
    //       setStoreUnitList(payload.records);
    //       setAdCity(region.regionName);
    //     }
    //   }
    // });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const payload = await getHotMovieTrigger().unwrap();
      const soon = await getSoonMovieTrigger().unwrap();
      hotMovie.current = payload;
      soonMovie.current = soon;
    } catch (error) {}
  };

  const handleInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    setSearchValue(e.detail.value);
  };
  return (
    <BasePage
      isLoading={isLoading || sonnLoading}
      className={styles.page}
      headerClassName={styles.headerStyle}
      headerLeftComponent={() => (
        <View className={styles.city} onClick={goCityList}>
          <Text className={styles.text}>厦门市</Text>
          <Image className={styles.down} src={downImg} mode="widthFix" />
        </View>
      )}
      headerSearchView={() => (
        <View className={styles.search}>
          <View className={styles.icon}>
            <Image
              className={styles.searchIcon}
              src={SEARCHICON}
              mode="widthFix"
            />
          </View>
          <Input
            className={styles.input}
            placeholder="输入"
            focus
            onBlur={handleInput}
          />
        </View>
      )}
    >
      <HeaderSwiper />
      <HotOnline data={hotMovie.current} />
      <ComingSoon data={soonMovie.current} />
    </BasePage>
  );
};
export default Index;
