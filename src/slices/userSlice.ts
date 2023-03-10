import Taro from "@tarojs/taro";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_INFO_STORAGE } from "@/constants/storage";

export type UserInfoType = {
  avatarUrl: string;
  cityRegionId: string;
  createTime: string;
  gender: number;
  customerId: number;
  name: string;
  nickname: string;
  provinceRegionId: string;
  tel: string;
  updateTime: string;
};

const userSlice = createSlice({
  name: "user",
  initialState: () => {
    try {
      let userInfo: UserInfoType = Taro.getStorageSync(USER_INFO_STORAGE);
      return userInfo;
    } catch {
      return {} as UserInfoType;
    }
  },
  reducers: {
    setUserInfo: (_, action: PayloadAction<UserInfoType>) => {
      Taro.setStorage({
        key: USER_INFO_STORAGE,
        data: action.payload,
      });
      return action.payload;
    },
    clear: () => {
      Taro.removeStorage({
        key: USER_INFO_STORAGE,
      });
      return {} as UserInfoType;
    },
  },
});

export const { setUserInfo, clear } = userSlice.actions;

export default userSlice.reducer;
