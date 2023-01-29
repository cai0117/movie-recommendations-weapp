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
  const [getMovieSoonInfoTrigger, { isLoading: soonLoading }] =
    useLazyGetMovieSoonInfoQuery();
  const dict = useAppSelector((state) => state.color);
  const [data, setData] = useState<Movie>({} as Movie);
  const color = useRef<string>("");

  const getDiffApi = (apiFlag: string | undefined) => {
    if (!apiFlag) {
      return getMovieInfoTrigger(Number(id)).unwrap();
    } else if (apiFlag === "soon") {
      return getMovieSoonInfoTrigger(Number(id)).unwrap();
    } else {
      return getMovieHotInfoTrigger(Number(id)).unwrap();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const payload = await getDiffApi(flag);
      setData(payload);
      color.current = getBackgroundColorByType(payload.type, dict);
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
