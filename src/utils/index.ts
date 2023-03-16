import { ref } from "vue"
let timer = ref< NodeJS.Timeout | null>(null)
export class Debounced {
  /**
   * 11.22
   * @param fn 需要防抖的函数
   * @param wait 等待时间
   * @param immediate 是否立即触发
   */
  static use(fn: Function, wait = 500, immediate = false) {
    return (...args: any) => {
      if (timer.value) {
        clearTimeout(timer.value)
      }
      if (immediate) {
        // 马上触发
        if (!timer.value) fn.call(this, ...args)
        timer.value = setTimeout(() => {
          timer.value = null  //n 秒内 多次触发事件,重新计算timer
        }, wait)
      } else {
        // 等待触发
        timer.value = setTimeout(() => {
          fn.call(this, ...args)
        }, wait)
      }
    }
  }
}