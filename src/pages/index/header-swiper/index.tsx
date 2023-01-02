import React from "react";
import { Swiper, SwiperItem, Image } from "@tarojs/components";
import EXAMPLE from "@/images/coupons.png";
import styles from "./index.module.less";

type Props = {
  goMovieDetail: (id: number) => void;
};

const HeaderSwiper: React.FC<Props> = (props) => {
  const { goMovieDetail } = props;
  return (
    <Swiper
      className={styles.swiper}
      indicatorDots
      autoplay
      indicatorActiveColor="#ffffff"
    >
      <SwiperItem>
        <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
      </SwiperItem>
      <SwiperItem>
        <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
      </SwiperItem>
    </Swiper>
  );
};

export default React.memo(HeaderSwiper);
