import React, { useEffect, useMemo, useState } from "react";
import { Movie, useGetAllMovieMutation } from "@/api/movie";
import ScrollLoading from "@/components/scroll-loading";
import MovieItem from "../movie-item";
import styles from "./index.module.less";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  label: string[];
};
const ScrollMovie: React.FC<Props> = (props) => {
  const { setLoading, label } = props;
  const [data, setData] = useState<Movie[]>([]);
  const [getAllMovie] = useGetAllMovieMutation();

  const getInput = useMemo(() => {
    if (label.length <= 0) return {};
    return { type: label.join("/") };
  }, [label]);

  return (
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
  );
};
export default React.memo(ScrollMovie);
