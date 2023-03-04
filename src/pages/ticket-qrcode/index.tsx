import React, { useMemo, useRef, useState } from "react";
import { View, Image } from "@tarojs/components";
import BasePage from "@/components/base-page";
import QRCode from "@/components/qrcode";
import styles from "./index.module.less";

const SeatSelection = () => {
  return (
    <BasePage className={styles.page} title="我的电影票">
      <View className={styles.comboDetails}>
        <View className={styles.info}>
          <View className={styles.content}>
            <View className={styles.big}>阿甘正传</View>
            <View>国语2D 2张</View>
            <View>2021-12-17</View>
            <View className={styles.more}>9排9座 | 9排10座</View>
          </View>
          <Image
            src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.jpg"
            mode="aspectFill"
            className={styles.movie}
          />
        </View>
        <View className={styles.diliver}>
          <View className={styles.dash}></View>
        </View>
        <View className={styles.qrcode}>
          <View className={styles.text}>取电影票</View>
          <QRCode url="1" width={150} height={150} className={styles.QRcode} />
        </View>
      </View>
    </BasePage>
  );
};
export default SeatSelection;
