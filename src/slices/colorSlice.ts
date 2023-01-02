import Taro from "@tarojs/taro";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dict } from "@/api/dict";
import { COLOR_TYPE } from "@/constants/storage";

export type DictType = Dict[];

const colorSlice = createSlice({
  name: "user",
  initialState: () => {
    try {
      let colorType: DictType = Taro.getStorageSync(COLOR_TYPE);
      return colorType;
    } catch {
      return {} as DictType;
    }
  },
  reducers: {
    setColorType: (_, action: PayloadAction<DictType>) => {
      Taro.setStorage({
        key: COLOR_TYPE,
        data: action.payload,
      });
      return action.payload;
    },
    clear: () => {
      Taro.removeStorage({
        key: COLOR_TYPE,
      });
      return {} as DictType;
    },
  },
});

export const { setColorType, clear } = colorSlice.actions;

export default colorSlice.reducer;
