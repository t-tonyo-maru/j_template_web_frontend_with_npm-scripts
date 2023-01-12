/**
 * デバイスがタッチ可能かを判定する
 *
 * @param {window} - windowオブジェクト
 * @return {boolean} - true: タッチ可能なデバイス, false: タッチ不可なデバイス。
 */
export const getIsTouchableDevice = (window: Window): boolean => {
  return (
    typeof window.ontouchstart !== 'undefined' &&
    window.navigator.maxTouchPoints > 0
  )
}
