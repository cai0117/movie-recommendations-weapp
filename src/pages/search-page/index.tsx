import React, { useMemo, useState } from "react";
import {
  View,
  Image,
  Text,
  Input,
  InputProps,
  BaseEventOrig,
  CommonEventFunction,
} from "@tarojs/components";
import { Movie, useGetAllMovieMutation } from "@/api/movie";
import BasePage from "@/components/base-page";
import ScrollLoading from "@/components/scroll-loading";
import SEARCH_ICON from "@/images/search.png";
import MovieItem from "../movie-classification/movie-item";
import styles from "./index.module.less";

const SearchPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [getAllMovie] = useGetAllMovieMutation();

  const getInput = useMemo(() => {
    return { title: searchValue };
  }, [searchValue]);

  const handleBlur = (
    event: BaseEventOrig<InputProps.inputValueEventDetail>
  ) => {
    setSearchValue(event.detail.value);
  };
  return (
    <BasePage className={styles.page} title="搜索" isLoading={loading}>
      <View className={styles.search}>
        <View className={styles.icon}>
          <Image
            className={styles.searchIcon}
            src={SEARCH_ICON}
            mode="widthFix"
          />
        </View>
        <Input
          className={styles.input}
          placeholder="请输入"
          onBlur={handleBlur}
        />
      </View>
      <ScrollLoading
        className={styles.scroll}
        page={getInput}
        setLoading={setLoading}
        getApi={getAllMovie}
        data={data}
        setData={setData}
      >
        {data.map((res) => (
          <MovieItem key={res.movieId} data={res} />
        ))}
      </ScrollLoading>
    </BasePage>
  );
};
export default SearchPage;
