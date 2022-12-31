import React, { useMemo, useState } from "react";
import { View, Button } from "@tarojs/components";
import { Dict } from "@/api/dict";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";

type Props = {
  confirmSelect: boolean;
  data: Dict[];
  setConfirmSelect: React.Dispatch<React.SetStateAction<boolean>>;
};
const SelectView: React.FC<Props> = (props) => {
  const { confirmSelect, setConfirmSelect, data } = props;
  const [labelSelect, setLabelSelect] = useState<boolean>(false);
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

  const handleSelect = () => {
    setLabelSelect((pre) => !pre);
  };

  const handleConfirm = () => {
    setConfirmSelect(false);
  };

  const handleReset = () => {
    setLabelSelect(false);
  };
  return (
    <View
      className={confirmSelect ? styles.selectContent : styles.hide}
      style={{ top: `${navHeight - 5}` }}
    >
      <View className={styles.labelContent}>
        <View className={styles.content}>
          {data.map((res) => (
            <View
              key={res.id}
              className={labelSelect ? styles.selectLabel : styles.label}
              onClick={handleSelect}
            >
              {res.name}
            </View>
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
