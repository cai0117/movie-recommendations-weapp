import React, { useMemo } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import NavBar from "../nav-bar";
import Spin from "../spin";
import SafeAreaFooter from "../safe-area-footer";
import styles from "./index.module.less";

type Props = React.PropsWithChildren<
  Partial<{
    className: string;
    title: string;
    isLoading: boolean;
    isError: boolean;
    hideHeader: boolean;
    fixedHeader: boolean;
    headerClassName: string;
    titleClassName: string;
    style: React.CSSProperties;
    stickerFix: boolean; //sticker是否fix，默认relative
    headerLeftComponent?: () => React.ReactNode;
    headerSearchView?: () => React.ReactNode;
    footer: () => React.ReactNode;
    overlay: () => React.ReactNode;
    sticker: () => React.ReactNode;
    goBack?: () => void;
  }>
>;

const BasePage: React.FC<Props> = (props) => {
  const {
    className,
    isLoading,
    isError,
    children,
    title,
    fixedHeader,
    hideHeader,
    headerClassName = "",
    titleClassName = "",
    style,
    stickerFix = false,
    headerLeftComponent,
    headerSearchView,
    footer,
    overlay,
    sticker,
    goBack,
  } = props;

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
      menuButtonObject,
    };
  }, []);

  return (
    <View className={`${styles.container} ${className}`} style={style}>
      {!hideHeader && (
        <NavBar
          headerLeftComponent={headerLeftComponent}
          headerSearchView={headerSearchView}
          title={title}
          fixed={fixedHeader}
          className={headerClassName}
          titleClassName={titleClassName}
          goBack={goBack}
        />
      )}
      {sticker && (
        <View
          style={
            stickerFix
              ? {
                  position: "fixed",
                  width: "100%",
                  zIndex: "1000",
                  left: 0,
                  top: `${navHeight.navBarHeight + 5}px`,
                }
              : {
                  position: "relative",
                }
          }
        >
          {sticker()}
        </View>
      )}

      <View className={styles.body}>
        {isLoading && <Spin />}
        {isError && <View className={styles.errorContainer}>页面出错了！</View>}
        {children}
      </View>
      {footer && <SafeAreaFooter>{footer()}</SafeAreaFooter>}
      {overlay && overlay()}
    </View>
  );
};

export default React.memo(BasePage);
