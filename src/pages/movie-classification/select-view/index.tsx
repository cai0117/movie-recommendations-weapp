import React, { useMemo, useState } from "react";
import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";

type Props = {
  comfirmSelect: boolean;
  setComfirmSelect: React.Dispatch<React.SetStateAction<boolean>>;
};
const SelectView: React.FC<Props> = (props) => {
  const { comfirmSelect, setComfirmSelect } = props;
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

  const handleComfirm = () => {
    setComfirmSelect(false);
  };

  const handleReset = () => {
    setLabelSelect(false);
  };
  return (
    <View
      className={comfirmSelect ? styles.selectContent : styles.hide}
      style={{ top: `${navHeight - 5}` }}
    >
      <View className={styles.labelContent}>
        <View className={styles.content}>
          <View
            className={labelSelect ? styles.selectLabel : styles.label}
            onClick={handleSelect}
          >
            全部
          </View>
        </View>
        <View className={styles.button}>
          <Button className={styles.reset} onClick={handleReset}>
            重置
          </Button>
          <Button className={styles.comfirm} onClick={handleComfirm}>
            确定
          </Button>
        </View>
      </View>
      <View
        className={styles.mask}
        onClick={() => setComfirmSelect(false)}
      ></View>
    </View>
  );
};
export default React.memo(SelectView);
