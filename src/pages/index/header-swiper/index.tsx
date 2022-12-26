import React from "react";
import { Swiper, SwiperItem, Image } from "@tarojs/components";
import EXAMPLE from "@/images/coupons.png";
import styles from "./index.module.less";

type Props = {};

const HeaderSwiper: React.FC<Props> = (props) => {
  return (
    <Swiper className={styles.swiper} indicatorDots autoplay>
      <SwiperItem>
        <Image src={EXAMPLE} mode="aspectFill" className={styles.img} />
      </SwiperItem>
    </Swiper>
  );
};

export default React.memo(HeaderSwiper);
