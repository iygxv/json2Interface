import { ref } from "vue";

let timer = ref<NodeJS.Timeout | null>(null);
export class Debounced {
  /**
   * @param fn 需要防抖的函数
   * @param wait 等待时间
   * @param immediate 是否立即触发
   */
  static use(fn: Function, wait = 500, immediate = false) {
    return (...args: any) => {
      if (timer.value) {
        clearTimeout(timer.value);
      }
      if (immediate) {
        if (!timer.value) fn.call(this, ...args);
        timer.value = setTimeout(() => {
          timer.value = null; //n 秒内 多次触发事件,重新计算timer
        }, wait);
      } else {
        timer.value = setTimeout(() => {
          fn.call(this, ...args);
        }, wait);
      }
    };
  }
}

export const exampleJsonStr = `{
  "id": "12313",
  "idNumber": "123123132",
  "name": "test",
  "sex": "02",
  "address": "哈哈",
  "contact": "1222",
  "createTime": 1669283844812,
  "lastUpdateTime": 1669283844812,
  "status": "0",
  "operator": null,
  "data": {
    "page": 0,
    "pageSize": 0,
    "begin": null,
    "end": null,
    "bath": null,
    "rowId": "1"
  }
}
`;

export const formatJsonString = (jsonString) => {
  try {
    // 解析 JSON 字符串为对象
    const jsonObject = JSON.parse(jsonString);

    // 递归函数来格式化对象或数组
    function formatValue(value, indent = "") {
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          // 处理数组
          return `[  
${value
  .map((item) => indent + "  " + formatValue(item, indent + "  "))
  .join(",\n")}  
${indent}]`;
        } else {
          // 处理对象
          return `{\n${Object.entries(value)
            .map(
              ([key, val]) =>
                indent + '  "' + key + '": ' + formatValue(val, indent + "  ")
            )
            .join(",\n")}  
${indent}}`;
        }
      } else if (typeof value === "string") {
        // 字符串需要引号包围
        return `"${value.replace(/"/g, '\\"')}"`;
      } else {
        // 其他类型直接返回
        return String(value);
      }
    }

    // 调用递归函数来格式化整个对象
    return formatValue(jsonObject);
  } catch (error) {
    // 如果解析 JSON 失败，返回原始字符串
    return jsonString;
  }
};
