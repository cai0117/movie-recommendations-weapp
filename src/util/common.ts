//日期格式化
export const formatDate = (date: string, indexMonth: boolean) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8);
  if (indexMonth) {
    return year + "年" + month + "月";
  } else {
    return year + "年" + month + "月" + day + "日";
  }
};
