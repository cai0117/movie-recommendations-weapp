import React, { useCallback, useEffect, useState } from "react";
import { Image } from "@tarojs/components";
import SEAT from "@/images/seat.png";
import CHOOSE_SEAT from "@/images/choose_seat.png";
import { CheckArray } from "..";
import styles from "./index.module.less";

type Props = {
  data: CheckArray;
  setSelectionSeat: React.Dispatch<React.SetStateAction<CheckArray[]>>;
  selectionSeat: CheckArray[];
};
const Seat: React.FC<Props> = (props) => {
  const { data, setSelectionSeat, selectionSeat } = props;
  const [check, setCheck] = useState<boolean>(false);
  const handleCheck = () => {
    setCheck((pre) => !pre);
  };
  useEffect(() => {
    if (check) {
      setSelectionSeat((pre) => [...pre, data]);
    } else {
      setSelectionSeat((pre) => pre.filter((res) => res.key !== data.key));
    }
  }, [check]);
  const isCheck = useCallback(() => {
    let isSelect = selectionSeat.find((res) => res.key === data.key);
    if (isSelect) {
      setCheck(true);
      return;
    }
    setCheck(false);
  }, [data, selectionSeat]);

  useEffect(() => {
    isCheck();
  }, [selectionSeat]);
  return (
    <Image
      src={check ? CHOOSE_SEAT : SEAT}
      mode="aspectFit"
      className={styles.seat}
      onClick={handleCheck}
    />
  );
};
export default React.memo(Seat);
