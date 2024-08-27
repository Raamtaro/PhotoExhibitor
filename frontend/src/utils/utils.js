//credit @ jankohlbach --> https://github.com/jankohlbach/codrops-shader-on-scroll/blob/master/js/utils.js

export const calcFov = (CAMERA_POS) => 2 * Math.atan((window.innerHeight / 2) / CAMERA_POS) * 180 / Math.PI

export const debounce = (func, timeout = 300) => {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

export const lerp = (start, end, damping) => start * (1 - damping) + end * damping