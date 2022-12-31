import { ScrollView } from "@tarojs/components";
import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "./index.module.less";

type Props = PropsWithChildren<{
  input: object;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getApi: Function;
  className?: string;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}>;

const ScrollLoading: React.FC<Props> = props => {
  const {
    getApi,
    setLoading,
    className,
    children,
    input,
    data,
    setData
  } = props;
  const [refresherTriggered, setRefresherTriggered] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const payload = await getApi({
        size: 10,
        current: 1,
        input: input
      }).unwrap();
      setData(payload.records);
      setTotal(payload.total);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const continueFetch = async () => {
    if (data.length >= total) return;
    try {
      let currentIndex = Math.floor(data.length / 10) + 1;
      const orderList = await getApi({
        size: 10,
        current: currentIndex,
        input: input
      }).unwrap();
      setTotal(orderList.total);
      setData([...data, ...orderList.records]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //下拉刷新，重新请求，从第一页开始
  const handleRefresh = async () => {
    if (refresherTriggered) return;
    try {
      setRefresherTriggered(true);
      const orderList = await getApi({
        size: 10,
        current: 1,
        input: input
      }).unwrap();
      setData(orderList.records);
      setRefresherTriggered(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className={className}
      scrollY
      refresherEnabled
      refresherBackground="#f5f6fa"
      refresherDefaultStyle="black"
      refresherTriggered={refresherTriggered}
      lowerThreshold={50}
      onRefresherRefresh={handleRefresh}
      onScrollToLower={continueFetch}
    >
      {children}
    </ScrollView>
  );
};

export default React.memo(ScrollLoading);
