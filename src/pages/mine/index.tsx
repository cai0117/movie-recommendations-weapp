import React, { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import BasePage from "@/components/base-page";
import styles from "./index.module.less";

const MinePage = () => {
  return (
    <BasePage title="个人中心">
      <Text>Hello world!</Text>
    </BasePage>
  );
};
export default MinePage;
