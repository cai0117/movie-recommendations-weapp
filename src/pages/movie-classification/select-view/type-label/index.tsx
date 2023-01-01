import React, { useState } from "react";
import { View } from "@tarojs/components";
import { Dict } from "@/api/dict";
import styles from "./index.module.less";

type selectDict = {
  key: number;
  value: string;
  check: boolean;
};
type Props = {
  data: Dict;
  setLabelSelect: React.Dispatch<React.SetStateAction<selectDict[]>>;
  getLabelById: selectDict | null;
};
const TypeLabel: React.FC<Props> = (props) => {
  const { data, getLabelById, setLabelSelect } = props;
  const handleSelect = (id: number) => {
    setLabelSelect((pre) =>
      pre.map((res) =>
        res.key === id
          ? { key: res.key, value: res.value, check: !res.check }
          : res
      )
    );
  };

  return (
    <View
      className={getLabelById?.check ? styles.selectLabel : styles.label}
      onClick={() => handleSelect(data.id)}
    >
      {data.name}
    </View>
  );
};
export default React.memo(TypeLabel);
