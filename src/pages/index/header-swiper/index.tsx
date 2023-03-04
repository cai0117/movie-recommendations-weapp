import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Swiper, SwiperItem, Image } from "@tarojs/components";
import { Movie, useGetAllMovieMutation } from "@/api/movie";
import styles from "./index.module.less";

type Props = {};

const HeaderSwiper: React.FC<Props> = (props) => {
  const [data, setData] = useState<Movie[]>([]);
  const [getAllMovie] = useGetAllMovieMutation();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const payload = await getAllMovie({
      current: 5,
      size: 6,
      input: {},
    }).unwrap();
    setData(payload.records);
  };
  const goMovieDetail = (id: number) => {
    Taro.navigateTo({ url: `/pages/movie-info/index?id=${id}` });
  };
  return (
    <Swiper
      className={styles.swiper}
      indicatorDots
      autoplay
      indicatorActiveColor="#ffffff"
    >
      {data.map((res) => (
        <SwiperItem key={res.movieId}>
          <Image
            src={res.cover}
            mode="aspectFill"
            className={styles.img}
            onClick={() => goMovieDetail(res.movieId)}
          />
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default React.memo(HeaderSwiper);
