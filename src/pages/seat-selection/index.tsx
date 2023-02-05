import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  MovableArea,
  MovableView,
  Button,
} from "@tarojs/components";
import BasePage from "@/components/base-page";
import Seat from "./seat";
import styles from "./index.module.less";

export type CheckArray = {
  key: number;
  value: number[];
};
const SeatSelection = () => {
  const arrayNumbers = useMemo(() => {
    let element: number[][] = [];
    let result: CheckArray[] = [];
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 6; column++) {
        element.push([row + 1, column + 1]);
      }
    }
    element.forEach((res, index) => {
      result.push({ key: index, value: res });
    });
    return result;
  }, []);
  const _seatArrayNumberRef = useRef<CheckArray[]>(arrayNumbers);
  const [selectionSeat, setSelectionSeat] = useState<CheckArray[]>([]);

  const handleCancel = (key: number) => {
    setSelectionSeat((pre) => pre.filter((res) => res.key !== key));
  };
  return (
    <BasePage className={styles.page} title="选座">
      <MovableArea className={styles.area}>
        <MovableView className={styles.areaView}>
          {_seatArrayNumberRef.current.map((res, index) => (
            <Seat
              key={index}
              data={res}
              setSelectionSeat={setSelectionSeat}
              selectionSeat={selectionSeat}
            />
          ))}
        </MovableView>
      </MovableArea>
      <View className={styles.info}>
        <View className={styles.select}>
          {selectionSeat.map((res) => (
            <View
              key={res.key}
              className={styles.tag}
              onClick={() => handleCancel(res.key)}
            >
              {res.value[0]}排{res.value[1]}座
            </View>
          ))}
        </View>
        <Button className={styles.pay}>购票</Button>
      </View>
    </BasePage>
  );
};
export default SeatSelection;
