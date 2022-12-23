import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import drawQrcode from "weapp-qrcode-canvas-2d";
import { Canvas, View } from "@tarojs/components";
import styles from "./index.module.less";

type Props = {
  url?: string;
  width: number;
  height: number;
  className?: string;
  isLoading?: boolean;
};

const QRCode: React.FC<Props> = (props) => {
  const { url, width, height, className, isLoading } = props;

  useEffect(() => {
    setTimeout(() => {
      handleCanvas(url);
    }, 100);
  }, [url]);

  const handleCanvas = (value: string | undefined) => {
    const query = Taro.createSelectorQuery();
    query
      .select(`#canvasid`)
      .fields({
        size: true,
        node: true,
      })
      .exec((res) => {
        let canvas = res[0].node;
        // 调用方法drawQrcode生成二维码
        drawQrcode({
          canvas: canvas,
          canvasId: "canvasid",
          width: width,

          text: value,
        });

        // 获取临时路径（得到之后，想干嘛就干嘛了）
        // Taro.canvasToTempFilePath({
        //   canvasId: "canvasid",
        //   canvas: canvas,
        //   x: 0,
        //   y: 0,
        //   width: width,
        //   height: height,
        //   destWidth: width,
        //   destHeight: height,
        //   success(result) {
        //     console.log(result.tempFilePath);
        //   }
        // });
      });
  };

  return (
    <View>
      <Canvas
        id="canvasid"
        type="2d"
        canvasId="canvasid"
        className={className}
        style={{ width: width, height: height }}
      ></Canvas>
    </View>
  );
};

export default React.memo(QRCode);
