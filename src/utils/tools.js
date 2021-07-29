/**
 * @description: 禁止页面滚动/允许页面滚动
 * @param {type}
 * @returns
 */
export const lockMaskScroll = (bodyCls => {
  let scrollTop
  return {
    afterOpen: () => {
      scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = `${-scrollTop}px`
    },
    beforeClose: () => {
      if (document.body.classList.contains(bodyCls)) {
        document.body.classList.remove(bodyCls)
        document.scrollingElement.scrollTop = scrollTop
      }
    }
  }
})('dialog-open')

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (() => {
  if (document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }

  return (element, event, handler) => {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler)
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (() => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }

  return (element, event, handler) => {
    if (element && event) {
      element.detachEvent(`on${event}`, handler)
    }
  }
})()

/**
 * dom元素是否有指定class
 * @param ele dom元素
 * @param cls class
 */
export const hasClass = (ele, cls) => ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`))
/**
 * 为dom元素添加class
 * @param ele dom元素
 * @param cls class
 */
export const addClass = (ele, cls) => {
  // eslint-disable-next-line no-param-reassign
  if (!hasClass(ele, cls)) ele.className += ` ${cls}`
}

/**
 * 为dom元素移除class
 * @param ele
 * @param cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
    // eslint-disable-next-line no-param-reassign
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @description 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 interval 毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。防抖
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const throttle = (fn, interval = 300) => {
  let canRun = true
  return function innerThrottle (...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, args)
      canRun = true
    }, interval)
  }
}

/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后。节流
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const debounce = (fn, interval = 300) => {
  let timeout = null
  return function innerDebounce (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}

/**
 * @description: 判断是否是iphoneX系列机型
 * @returns Boolean
 */
export const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    )
  }
  return false
}

/**
 * 滚动到页面指定位置
 * @param scrollTop
 */
export const scrollTo = scrollTop => {
  let topTimer = null
  cancelAnimationFrame(topTimer)
  topTimer = requestAnimationFrame(function fn () {
    const oTop = document.body.scrollTop || document.documentElement.scrollTop
    if (oTop > scrollTop) {
      if (oTop > 0) {
        document.documentElement.scrollTop = oTop - Math.floor((oTop - scrollTop) / 3)
        document.body.scrollTop = document.documentElement.scrollTop
        topTimer = requestAnimationFrame(fn);
        (oldTop => {
          if (Math.abs(oldTop - oTop) <= 2) {
            cancelAnimationFrame(topTimer)
          }
        })(document.documentElement.scrollTop || document.body.scrollTop)
      } else {
        cancelAnimationFrame(topTimer)
      }
    } else if (oTop < scrollTop) {
      document.documentElement.scrollTop = oTop + Math.ceil((scrollTop - oTop) / 3)
      document.body.scrollTop = document.documentElement.scrollTop
      topTimer = requestAnimationFrame(fn);
      (oldTop => {
        if (Math.abs(oldTop - oTop) <= 2) {
          cancelAnimationFrame(topTimer)
        }
      })(document.documentElement.scrollTop || document.body.scrollTop)
    } else {
      cancelAnimationFrame(topTimer)
    }
  })
}

/**
 * @description: 获取设备类型
 * @returns {string}
 */
export const getDevice = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('iphone') !== -1) {
    return 'iphone'
  }
  if (ua.indexOf('ipad') !== -1) {
    return 'ipad'
  }
  if (ua.indexOf('android') !== -1) {
    return 'android'
  }
  return 'unkonwn'
}
/**
 * 获取环境信息
 * @returns {string}
 */
export const getEnv = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (!/mobile|android/.test(ua)) {
    return 'pc'
  }
  if (/micromessenger(\/[\d]+)*/.test(ua)) {
    return 'weixin'
  }
  if (/qq\/(\/[\d]+)*/.test(ua) || /qzone\//.test(ua)) {
    return 'qq'
  }
  return 'h5'
}

/**
 * @description: 判断元素是否在可视范围内
 * @param {type} partiallyVisible 为是否为部分可见
 * @return:
 */
export function elementIsVisibleInViewport (el, partiallyVisible = false) {
  const {
    top, left, bottom, right
  } = el.getBoundingClientRect()

  return partiallyVisible ? ((top > 0 && top < window.innerHeight)
    || (bottom > 0 && bottom < window.innerHeight))
    && ((left > 0 && left < window.innerWidth) || (right > 0 && right < window.innerWidth)
    ) : (top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth)
}

// 填充两位
export const fill2 = (V) => {
  let v = `${V}`
  while (v.length < 2) {
    v = `0${v}`
  }
  return v
}

// 是否到达页面底部
export function bottomVisible () {
  return (
    document.documentElement.clientHeight + window.scrollY
  ) >= (
    document.documentElement.scrollHeight || document.documentElement.clientHeight
  )
}
