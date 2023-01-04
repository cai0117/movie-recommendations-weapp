import React, { useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { useAppSelector } from "@/redux/hooks";
import BasePage from "@/components/base-page";
import {
  Movie,
  useLazyGetMovieHotInfoQuery,
  useLazyGetMovieInfoQuery,
  useLazyGetMovieSoonInfoQuery,
} from "@/api/movie";
import { getBackgroundColorByType } from "@/util/color";
import styles from "./index.module.less";
import MovieItem from "./movie-item";
import SeemItem from "./seem-item";
import StaffInfo from "./staff-info";
import PreviewVideo from "./preview-video";
import Commend from "./commend";
import Synopsis from "./synopsis";

const MovieInfo = () => {
  const router = useRouter();
  const { id, flag } = router.params;
  const [getMovieInfoTrigger, { isLoading }] = useLazyGetMovieInfoQuery();
  const [getMovieHotInfoTrigger, { isLoading: hotLoading }] =
    useLazyGetMovieHotInfoQuery();
  const [getMovieSonnInfoTrigger, { isLoading: soonLoading }] =
    useLazyGetMovieSoonInfoQuery();
  const dict = useAppSelector((state) => state.color);
  const [data, setData] = useState<Movie>({} as Movie);
  const color = useRef<string>("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      if (!flag) {
        const payload = await getMovieInfoTrigger(Number(id)).unwrap();
        setData(payload);
        color.current = getBackgroundColorByType(payload.type, dict);
      } else if (flag === "soon") {
        const payload = await getMovieSonnInfoTrigger(Number(id)).unwrap();
        setData(payload);
        color.current = getBackgroundColorByType(payload.type, dict);
      } else {
        const payload = await getMovieHotInfoTrigger(Number(id)).unwrap();
        setData(payload);
        color.current = getBackgroundColorByType(payload.type, dict);
      }
    } catch (error) {}
  };
  return (
    <BasePage
      isLoading={isLoading || hotLoading || soonLoading}
      className={styles.page}
      style={{ backgroundColor: color.current }}
    >
      <MovieItem data={data} />
      <SeemItem data={data} />
      <Synopsis data={data} />
      <StaffInfo data={data} />
      <PreviewVideo data={data} />
      <Commend data={data} />
    </BasePage>
  );
};
export default MovieInfo;
