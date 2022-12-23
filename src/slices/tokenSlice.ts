import Taro from "@tarojs/taro";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_STORAGE, REFRESH_TOKEN_STORAGE } from "@/constants/storage";

export const tokenSlice = createSlice({
  name: "token",
  initialState: () => {
    try {
      let token: string = Taro.getStorageSync(TOKEN_STORAGE);
      let refreshToken: string = Taro.getStorageSync(REFRESH_TOKEN_STORAGE);
      return {
        token: token,
        refreshToken: refreshToken
      };
    } catch {
      return {
        token: "",
        refreshToken: ""
      };
    }
  },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Taro.setStorage({
        key: TOKEN_STORAGE,
        data: action.payload
      });
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      Taro.setStorage({
        key: REFRESH_TOKEN_STORAGE,
        data: action.payload
      });
    },
    clear: () => {
      Taro.removeStorage({
        key: TOKEN_STORAGE
      });
      Taro.removeStorage({
        key: REFRESH_TOKEN_STORAGE
      });
      return { token: "", refreshToken: "" };
    }
  }
});

export const { setToken, setRefreshToken, clear } = tokenSlice.actions;

export default tokenSlice.reducer;
