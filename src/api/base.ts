import Taro from "@tarojs/taro";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import store from "@/redux/store";
import { Mutex } from "async-mutex";
import { clear as tokenClear, setToken } from "@/slices/tokenSlice";

type TaroBaseQueryParams = {
  baseUrl: string;
};
const mutex = new Mutex();

const TaroBaseQuery =
  ({
    baseUrl,
  }: TaroBaseQueryParams): BaseQueryFn<
    {
      url: string;
      method: Taro.request.Option["method"];
      data?: Taro.request.Option["data"];
      header?: Taro.request.Option["header"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data: requestData, header }, api) => {
    // async function refreshToken() {
    //   if (!mutex.isLocked()) {
    //     const release = await mutex.acquire();
    //     try {
    //       const _refreshToken = store.getState().token.refreshToken;
    //       const token = store.getState().token.token;
    //       const userId = store.getState().user.id;
    //       if (_refreshToken && userId && token) {
    //         let result = await Taro.request({
    //           url: baseUrl + "/buyer-mapp/refreshToken",
    //           method: "POST",
    //           header: {
    //             token: store.getState().token.token,
    //             "x-user-agent": "WECHAT_MP",
    //           },
    //           data: {
    //             refreshToken: store.getState().token.refreshToken,
    //             userId: userId,
    //           },
    //         });
    //         const { data } = result;
    //         const { data: newToken, success } = data;
    //         if (!success || !newToken) {
    //           api.dispatch(tokenClear());
    //           return false;
    //         }
    //         api.dispatch(setToken(newToken));
    //         return true;
    //       } else {
    //         api.dispatch(tokenClear());
    //         return false;
    //       }
    //     } catch {
    //       api.dispatch(tokenClear());
    //       return false;
    //     } finally {
    //       release();
    //     }
    //   } else {
    //     await mutex.waitForUnlock();
    //     return true;
    //   }
    // }

    await mutex.waitForUnlock();
    try {
      let result = await Taro.request({
        url: baseUrl + url,
        method: method,
        data: requestData,
        // header: {
        //   token: store.getState().token.token,
        //   "x-user-agent": "WECHAT_MP",
        //   ...header,
        // },
      });

      if (!store.getState().token.token) {
        Taro.reLaunch({ url: "/pages/login/index" });
      }
      // const { data, statusCode } = result;
      // const { msg, success } = data;
      // token失效
      // if (statusCode === 401) {
      //   const refreshSuccess = await refreshToken();
      //   // retry the initial query
      //   if (refreshSuccess) {
      //     let newResult = await Taro.request({
      //       url: baseUrl + url,
      //       method: method,
      //       data: requestData,
      //       header: {
      //         token: store.getState().token.token,
      //         "x-user-agent": "WECHAT_MP",
      //         ...header,
      //       },
      //     });
      //     if (!newResult?.data?.success) {
      //       throw new Error(msg);
      //     }
      //     return newResult.data;
      //   } else {
      //     Taro.reLaunch({ url: "/pages/login/index" });
      //     return;
      //   }
      // }
      // if (!success) {
      //   throw new Error(msg);
      // }
      return result.data;
    } catch (error) {
      throw error;
    }
  };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: TaroBaseQuery({
    baseUrl: "http://localhost:9091/movie",
  }),
  // 缓存，默认时间是秒，默认时长60秒
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  tagTypes: ["Order"],
  endpoints: () => ({}),
});
