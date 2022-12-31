import React, { useEffect, useState } from "react";
import { MovieInfo, useGetAllMovieMutation } from "@/api/movie";
import ScrollLoading from "@/components/scroll-loading";
import MovieItem from "../movie-item";
import styles from "./index.module.less";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScrollMovie: React.FC<Props> = (props) => {
  const { setLoading } = props;
  const [data, setData] = useState<MovieInfo[]>([]);
  const [getAllMovie] = useGetAllMovieMutation();

  return (
    <ScrollLoading
      className={styles.scroll}
      input={{}}
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
