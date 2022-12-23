import React, { useMemo } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import PIC_ARROR from "../../images/arrow.png";
import PIC_ARROR_WHITE from "../../images/arrow_white.png";
import styles from "./index.module.less";

type Props = Partial<{
  title: string;
  fixed: boolean;
  className: string;
  titleClassName: string;
  headerLeftComponent?: () => React.ReactNode;
  goBack?: () => void;
  showWhiteArrow: boolean;
}>;

const NavBar: React.FC<Props> = props => {
  const {
    title,
    fixed,
    className = "",
    titleClassName = "",
    headerLeftComponent,
    goBack,
    showWhiteArrow
  } = props;

  const showBackBtn = useMemo(() => {
    const pages = Taro.getCurrentPages();
    return pages.length > 1;
  }, []);

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
    return {
      navBarHeight,
      systemStatusBarHeight,
      menuButtonTop,
      menuButtonObject
    };
  }, []);

  const _goBack = () => {
    Taro.navigateBack();
  };

  return (
    <View
      className={`${styles.header}
        ${fixed ? styles.fixedHeader : ""}
        ${showBackBtn || headerLeftComponent ? styles.headerWithBackButton : ""}
        ${headerLeftComponent ? styles.headerLeftComponent : ""}
        ${!title ? styles.headerOnlyBackButton : ""}
        ${className}`}
      style={{
        height: navHeight.navBarHeight + 5,
        paddingBottom: 5,
        paddingTop: navHeight.systemStatusBarHeight
      }}
    >
      {headerLeftComponent && headerLeftComponent()}
      {!headerLeftComponent && showBackBtn && (
        <Image
          className={styles.backButton}
          src={showWhiteArrow ? PIC_ARROR_WHITE : PIC_ARROR}
          onClick={goBack ?? _goBack}
        />
      )}
      {title && (
        <View
          className={`${styles.title} ${titleClassName}`}
          style={{
            width: "150px"
          }}
        >
          {title}
        </View>
      )}
    </View>
  );
};

export default React.memo(NavBar);
