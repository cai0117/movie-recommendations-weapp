import React, { useState } from "react";
import ScrollLoading from "@/components/scroll-loading";
import { Movie, useGetHighMovieMutation } from "@/api/movie";
import MovieRatingInfo from "../movie-rating-info";
import styles from "./index.module.less";

type Props = {
  status: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwiperItemMovie: React.FC<Props> = (props) => {
  const { status, setLoading } = props;
  const [data, setData] = useState<Movie[]>([]);
  const [getHighMovie] = useGetHighMovieMutation();
  return (
    <ScrollLoading
      className={styles.container}
      input={{ status }}
      setLoading={setLoading}
      getApi={getHighMovie}
      data={data}
      setData={setData}
    >
      {data.map((res) => (
        <MovieRatingInfo key={res.movieId} data={res} />
      ))}
    </ScrollLoading>
  );
};

export default React.memo(SwiperItemMovie);
