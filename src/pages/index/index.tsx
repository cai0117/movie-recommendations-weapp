import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Input,
  BaseEventOrig,
  InputProps,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  Movie,
  MovieSoon,
  useLazyGetAllHotMovieQuery,
  useLazyGetAllSoonMovieQuery,
} from "@/api/movie";
import { useAppDispatch } from "@/redux/hooks";
import BasePage from "@/components/base-page";
import { setColorType } from "@/slices/colorSlice";
import downImg from "@/images/down.svg";
import SEARCHICON from "@/images/search.png";
import { useLazyGetAllDictQuery } from "@/api/dict";
import styles from "./index.module.less";
import HeaderSwiper from "./header-swiper";
import HotOnline from "./hot-online";
import ComingSoon from "./coming-soon";

const Index = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [getHotMovieTrigger, { isLoading }] = useLazyGetAllHotMovieQuery();
  const [getSoonMovieTrigger, { isLoading: sonnLoading }] =
    useLazyGetAllSoonMovieQuery();
  const [getDictTrigger, { isLoading: dictLoading }] = useLazyGetAllDictQuery();
  const hotMovie = useRef<Movie[]>([]);
  const soonMovie = useRef<MovieSoon[]>([]);
  const dispatch = useAppDispatch();
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
      const dict = await getDictTrigger().unwrap();
      dispatch(setColorType(dict));
      hotMovie.current = payload;
      soonMovie.current = soon;
    } catch (error) {}
  };

  const goMovieDetail = (id: number) => {
    Taro.navigateTo({ url: `/pages/movie-info/index?id=${id}` });
  };

  const handleInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    setSearchValue(e.detail.value);
  };
  return (
    <BasePage
      isLoading={isLoading || sonnLoading || dictLoading}
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
      <HeaderSwiper goMovieDetail={goMovieDetail} />
      <HotOnline data={hotMovie.current} goMovieDetail={goMovieDetail} />
      <ComingSoon data={soonMovie.current} goMovieDetail={goMovieDetail} />
    </BasePage>
  );
};
export default Index;
