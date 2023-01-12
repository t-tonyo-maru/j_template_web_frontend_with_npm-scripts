/**
 * windowリサイズ時に引数のcallback関数を実行するイベントを設定する関数
 *
 * @type {T} callback用のジェネリクス
 * @param args - リサイズイベント生成用のオプション
 * @param {T} args.callback - callback関数。ジェネリクスで指定する
 * @param {number} args.offset - windowリサイズ時の時間偏差。offsetミリ秒だけ待機した後にcallbackを発火させる。
 *                          もしoffsetミリ秒内に、再びwindowリサイズした場合に、callbackは発火しない。
 */
export const setWindowResizeEvent = <T extends Function>({
  callback,
  offset = 200
}: Readonly<{
  callback: T
  offset: number
}>) => {
  let timer: number = 0
  let currentWidth = window.innerWidth

  window.addEventListener('resize', () => {
    if (timer > 0) {
      clearTimeout(timer)
    }

    if (currentWidth === window.innerWidth) return

    timer = window.setTimeout(() => {
      // windowのresize時の処理
      callback()
    }, offset)
  })
}

/**
 * ResizeObserverにより、要素リサイズ時において任意の関数を実行する<br/>
 * ResizeObserver: https://developer.mozilla.org/ja/docs/Web/API/ResizeObserver
 *
 * @type {T} リサイズ対象の要素のためのジェネリクス。HTMLElementを継承。
 * @param args - リサイズイベント生成用のオプション
 * @param {ResizeObserverCallback} args.callback - 要素リサイズ時に発火するcallback関数。ResizeObserverCallback型
 * @param {T} args.target - リサイズ対象のHTML要素。
 */
export const setElementResizeEvent = <T extends HTMLElement>({
  callback,
  target
}: Readonly<{
  callback: ResizeObserverCallback
  target: T
}>) => {
  const resizeObserver = new ResizeObserver(callback)
  resizeObserver.observe(target)
}
