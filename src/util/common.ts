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

//评价人数格式化
export const formatEvoNum = (data: number) => {
  let param: string;
  let size = 10000;
  let unit = ["", "万"];
  let formatData: number;

  if (data < size) {
    return data;
  } else {
    formatData = Math.floor(Math.log(data) / Math.log(size));
    param = (data / Math.pow(size, formatData)).toFixed(1);
    return param + unit[formatData];
  }
};

//人数格式化
export const formatPerson = (data: number) => {
  let formatData = data.toString();
  if (formatData.length <= 3) {
    return formatData;
  } else {
    let format = formatData.length % 3;
    formatData =
      format > 0
        ? formatData.slice(0, format) +
          "," +
          formatData.slice(format, formatData.length).match(/\d{3}/g)!.join(",")
        : formatData
            .slice(format, formatData.length)
            .match(/\d{3}/g)!
            .join(",");
    return formatData;
  }
};
