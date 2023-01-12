/**
 * MediaQueryListオブジェクトを利用すると、任意のメディアクエリに合致する場合に関数を発火させる仕組みを実現できます。
 * window.resizeよりも関数発火回数を抑えられるため、レイアウトやアニメーションの制御に適しています。
 *
 * 参考
 * - [> MediaQueryList](https://developer.mozilla.org/ja/docs/Web/API/MediaQueryList)
 * - [> window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)
 */

// メディアクエリオブジェクト
const mediaQueryList = window.matchMedia('(max-width:767px)')

// リスナー関数
const listener = (event: MediaQueryListEvent) => {
  // リサイズ時に行う処理
  if (event.matches) {
    // 767px以下に発火
    console.log('SP用ブレークポイント用処理')
  } else {
    // 768px以上で発火
    console.log('PC用ブレークポイント用処理')
  }
}

// リスナーを登録
mediaQueryList.addEventListener('change', listener)

// 初期表示時にdispatchを利用して、リスナー関数を強制発火させる
mediaQueryList.dispatchEvent(
  new Event('change', { bubbles: false, cancelable: false })
)
