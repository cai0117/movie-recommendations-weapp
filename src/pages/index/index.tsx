import React, { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import BasePage from "@/components/base-page";
import styles from "./index.module.less";

const Index = () => {
  return (
    <BasePage title="首页">
      <Text>Hello world!</Text>
    </BasePage>
  );
};
export default Index;
