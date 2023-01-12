/**
 * 交差オブザーバー(IntersectionObserver)を返却する関数<br/>
 * IntersectionObserver: https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API<br/>
 * JSでのスクロール連動エフェクトにはIntersection Observerが便利: https://ics.media/entry/190902/
 *
 * @param args - IntersectionObserver生成用のオプション
 * @param {IntersectionObserverInit} args.options - IntersectionObserverのオプション
 * @param {IntersectionObserverCallback} args.callback - IntersectionObserverのオプションのコールバック関数
 * @return {IntersectionObserver} IntersectionObserverオブジェクト
 */
export const createIntersectionObserver = ({
  options,
  callback
}: Readonly<{
  options: IntersectionObserverInit
  callback: IntersectionObserverCallback
}>) => {
  return new IntersectionObserver(callback, options)
}
