import { Dict } from "@/api/dict";

export const getBackgroundColorByType = (type: string, colorList: Dict[]) => {
  const colorType = type.split("/");
  let index = Math.floor(Math.random() * colorList.length); //随机获取值
  switch (colorType.length) {
    case 0:
      return "#ffffff";
    case 1:
      return (
        colorList.find((item) => item.name === colorType[0])?.color ??
        colorList[index].color
      );
    case 2:
      return (
        colorList.find((item) => item.name === colorType[1])?.color ??
        colorList[index].color
      );
    case 3:
      return (
        colorList.find((item) => item.name === colorType[2])?.color ??
        colorList[index].color
      );
    default:
      return colorList[index].color;
  }
};
