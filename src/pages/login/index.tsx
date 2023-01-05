import React, { useState, useEffect, useMemo } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Image,
  Button,
  BaseEventOrig,
  ButtonProps,
  Radio,
  RadioGroup,
  Text,
} from "@tarojs/components";
import NavBar from "@/components/nav-bar";
import PIC_LOGIN_LOGO from "@/images/mine.png";
import PIC_ARROW from "@/images/arrow.png";
import { useLoginMutation } from "@/api/loginApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRefreshToken, setToken } from "@/slices/tokenSlice";
import {
  setUserInfo as storageUserInfo,
  clear as userClear,
} from "@/slices/userSlice";
import styles from "./index.module.less";

const LoginPage = () => {
  const [jsCode, setJsCode] = useState<string>();
  const [userInfo, setUserInfo] = useState<Taro.UserInfo>({});
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { token } = useAppSelector((state) => state.token);

  // const fetchWxCode = () => {
  //   Taro.login({
  //     success: async res => {
  //       if (res.code) {
  //         setJsCode(res.code);
  //       } else {
  //         console.log("登录失败！" + res.errMsg);
  //         Taro.showToast({
  //           title: "登录失败",
  //           icon: "error",
  //           duration: 300
  //         });
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
  //   fetchWxCode();
  // }, []);

  const getPhoneNumber = (
    event: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => {
    if (event.detail.errMsg == "getPhoneNumber:ok") {
      handleLogin(event);
    } else {
      Taro.showToast({
        title: "获取电话号码失败",
        icon: "error",
        duration: 300,
      });
      console.log("获取电话号码失败", event);
      // fetchWxCode();
    }
  };

  const handleLogin = async (
    event: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => {
    if (!jsCode) {
      try {
        const payload = await login(
          Object.assign(
            {},
            { ...userInfo },
            {
              avatar: userInfo.avatarUrl || "",
              name: userInfo.nickName || "",
              origin: "WECHAT",
            }
          )
        ).unwrap();
        dispatch(setToken(payload.token));
        dispatch(storageUserInfo(payload.userInfo));
        if (Taro.getCurrentPages().length > 1) {
          Taro.navigateBack();
        } else {
          Taro.reLaunch({ url: "/pages/index/index" });
        }
      } catch (e) {
        console.log("登录失败,e=", e);
        Taro.showToast({
          title: "登录失败",
          icon: "error",
          duration: 300,
        });
        // fetchWxCode();
      }
    } else {
      Taro.showToast({
        title: "登录失败",
        icon: "error",
        duration: 300,
      });
      // fetchWxCode();
    }
  };

  const loginWithUserId = async () => {
    Taro.getUserProfile({
      desc: "获取您的昵称、头像", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        if (!jsCode) {
          console.log(res);
          try {
            const payload = await login({
              avatarUrl: res.userInfo.avatarUrl || "",
              name: res.userInfo.nickName || "",
              origin: "WECHAT",
              token: token ? token : "",
              tel: "15359792615",
            }).unwrap();
            console.log(payload);
            dispatch(setToken(payload.token));
            dispatch(storageUserInfo(payload.userInfo));
            if (Taro.getCurrentPages().length > 1) {
              Taro.navigateBack();
            } else {
              Taro.reLaunch({ url: "/pages/index/index" });
            }
          } catch (error: any) {
            Taro.showToast({
              title: "登录失败",
              icon: "error",
              duration: 300,
            });
            dispatch(userClear());
            // fetchWxCode();
          }
        } else {
          Taro.showToast({
            title: "登录失败",
            icon: "error",
            duration: 300,
          });
          // fetchWxCode();
        }
      },
      fail: () => {
        console.log("获取用户昵称头像失败");
      },
    });
  };

  const goHome = () => {
    Taro.reLaunch({ url: "/pages/index/index" });
  };

  return (
    <View className={styles.container}>
      <NavBar
        fixed
        headerLeftComponent={() => (
          <Image
            className={styles.backButton}
            src={PIC_ARROW}
            onClick={goHome}
          />
        )}
        goBack={goHome}
      />
      <Image className={styles.logo} src={PIC_LOGIN_LOGO} />
      <View className={styles.slogan}>记录美好旅途瞬间</View>

      <Button className={styles.button} onClick={loginWithUserId}>
        微信快捷登录
      </Button>
      {/* ) : (
        <Button
          className={styles.button}
          openType="getPhoneNumber"
          onGetPhoneNumber={getPhoneNumber}
        >
          微信快捷登录
        </Button>
      )} */}
    </View>
  );
};

export default LoginPage;
