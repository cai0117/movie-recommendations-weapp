import React, { useState, useEffect, useMemo } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import NavBar from "@/components/nav-bar";
import PIC_ARROW from "@/images/arrow.png";
import { useLoginMutation } from "@/api/loginApi";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/slices/tokenSlice";
import {
  setUserInfo as storageUserInfo,
  clear as userClear,
} from "@/slices/userSlice";
import styles from "./index.module.less";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const loginWithUserId = async () => {
    Taro.getUserProfile({
      desc: "获取您的昵称、头像", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        try {
          const payload = await login({
            avatarUrl: res.userInfo.avatarUrl || "",
            name: res.userInfo.nickName || "",
            origin: "WECHAT",
            tel: "15359792615",
          }).unwrap();
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
    <View
      className={styles.container}
      style={{
        background: `url(https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.jpg) center/cover no-repeat`,
      }}
    >
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

      <Button className={styles.button} onClick={loginWithUserId}>
        微信快捷登录
      </Button>
    </View>
  );
};

export default LoginPage;
