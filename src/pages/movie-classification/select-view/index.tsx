import React, { useEffect, useMemo, useState } from "react";
import { View, Button } from "@tarojs/components";
import { Dict } from "@/api/dict";
import Taro from "@tarojs/taro";
import TypeLabel from "./type-label";
import styles from "./index.module.less";

type Props = {
  confirmSelect: boolean;
  data: Dict[];
  setConfirmSelect: React.Dispatch<React.SetStateAction<boolean>>;
  selectValue: React.MutableRefObject<string[]>;
};
type selectDict = {
  key: number;
  value: string;
  check: boolean;
};
const SelectView: React.FC<Props> = (props) => {
  const { confirmSelect, setConfirmSelect, data, selectValue } = props;
  const [labelSelect, setLabelSelect] = useState<selectDict[]>([]);
  const initLabel = useMemo(() => {
    if (data)
      return data.map(
        (res) =>
          Object.assign({
            key: res.id,
            value: res.name,
            check: false,
          }) as selectDict
      );
    return [];
  }, [data]);
  useEffect(() => {
    setLabelSelect(initLabel);
  }, [initLabel]);

  const getLabelById = useMemo(
    () => (id: number) => {
      if (labelSelect.length <= 0) return null;
      return labelSelect.find((item) => item.key === id)!;
    },
    [labelSelect]
  );

  const navHeight = useMemo(() => {
    let menuButtonObject = Taro.getMenuButtonBoundingClientRect();
    let systemInfo = Taro.getSystemInfoSync();
    let systemStatusBarHeight = systemInfo.statusBarHeight || 0; //状态栏的高度
    let menuButtonHeight = menuButtonObject.height; //高度
    let menuButtonTop = menuButtonObject.top; //上边界坐标
    let navBarHeight =
      systemStatusBarHeight +
      menuButtonHeight +
      (menuButtonTop - systemStatusBarHeight) * 2;
    return navBarHeight;
  }, []);

  const handleConfirm = () => {
    selectValue.current = labelSelect
      .map((res) => (res.check ? res.value : ""))
      .filter((item) => item.length > 0);
    setConfirmSelect(false);
  };
  const handleReset = () => {
    let temp = labelSelect;
    const result = temp.map((res) => {
      return { key: res.key, value: res.value, check: false };
    });
    setLabelSelect(result);
  };
  return (
    <View
      className={confirmSelect ? styles.selectContent : styles.hide}
      style={{ top: `${navHeight - 5}` }}
    >
      <View className={styles.labelContent}>
        <View className={styles.content}>
          {data.map((res) => (
            <TypeLabel
              data={res}
              key={res.id}
              getLabelById={getLabelById(res.id)}
              setLabelSelect={setLabelSelect}
            />
          ))}
        </View>
        <View className={styles.button}>
          <Button className={styles.reset} onClick={handleReset}>
            重置
          </Button>
          <Button className={styles.confirm} onClick={handleConfirm}>
            确定
          </Button>
        </View>
      </View>
      <View
        className={styles.mask}
        onClick={() => setConfirmSelect(false)}
      ></View>
    </View>
  );
};
export default React.memo(SelectView);
