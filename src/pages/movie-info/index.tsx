import React, { useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useAppSelector } from "@/redux/hooks";
import { Image } from "@tarojs/components";
import BasePage from "@/components/base-page";
import { Movie, useLazyGetMovieInfoQuery } from "@/api/movie";
import { getBackgroundColorByType } from "@/util/color";
import styles from "./index.module.less";

const MovieInfo = () => {
  const router = useRouter();
  const id = router.params.id;
  const [getMovieInfoTrigger, { isLoading }] = useLazyGetMovieInfoQuery();
  const dict = useAppSelector((state) => state.color);
  const [data, setData] = useState<Movie>({} as Movie);
  const color = useRef<string>("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const payload = await getMovieInfoTrigger(Number(id)).unwrap();
      setData(payload);
      color.current = getBackgroundColorByType(payload.type, dict);
    } catch (error) {}
  };
  return (
    <BasePage
      isLoading={isLoading}
      className={styles.page}
      style={{ backgroundColor: color.current }}
    >
      <Image src={data.cover} mode="aspectFill" className={styles.img} />
    </BasePage>
  );
};
export default MovieInfo;
