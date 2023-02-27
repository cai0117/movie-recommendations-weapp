import React, { useEffect, useState } from "react";
import { Swiper, SwiperItem, Image } from "@tarojs/components";
import { Movie, useGetAllMovieMutation } from "@/api/movie";
import styles from "./index.module.less";

type Props = {
  goMovieDetail: (id: number) => void;
};

const HeaderSwiper: React.FC<Props> = (props) => {
  const { goMovieDetail } = props;
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
  return (
    <Swiper
      className={styles.swiper}
      indicatorDots
      autoplay
      indicatorActiveColor="#ffffff"
    >
      {data.map((res) => (
        <SwiperItem key={res.movieId}>
          <Image src={res.cover} mode="aspectFill" className={styles.img} />
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default React.memo(HeaderSwiper);
