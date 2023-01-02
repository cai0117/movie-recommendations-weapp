import React, { useCallback, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Image, CoverView, CoverImage } from "@tarojs/components";
import BasePage from "@/components/base-page";
import { Movie, useLazyGetMovieInfoQuery } from "@/api/movie";

import styles from "./index.module.less";

const MovieInfo = () => {
  const router = useRouter();
  const id = router.params.id;
  const [getMovieInfoTrigger, { isLoading }] = useLazyGetMovieInfoQuery();
  const [data, setData] = useState<Movie>({} as Movie);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const payload = await getMovieInfoTrigger(Number(id)).unwrap();
      setData(payload);
    } catch (error) {}
  };
  return (
    <BasePage isLoading={isLoading} className={styles.page}>
      <Image src={data.cover} mode="aspectFill" className={styles.img} />
    </BasePage>
  );
};
export default MovieInfo;
