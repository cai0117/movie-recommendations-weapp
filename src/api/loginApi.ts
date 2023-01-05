import Taro from "@tarojs/taro";
import { baseApi } from "./base";

type Request = Partial<{
  avatarUrl: string;
  origin: string;
  tel: string;
  name: string;
  token: string;
}>;

type Result = {
  token: string;
  userInfo: {
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
};

const LoginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Result, Request>({
      query: (data) => ({
        url: "/movieCustomer/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useLoginMutation } = LoginApi;

export default LoginApi;
