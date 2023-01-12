/**
 * body要素のスクロールを禁止させる。モーダル表示時に便利です<br/>
 * スクロール値の保持のために、クロージャーの形式をとっています。
 *
 * @return {{ toggleStopScroll: () => void, scrollTop: number, isStopScroll: boolean }} スクロール禁止を切り替える関数
 */
export const setStopScrollHandler = () => {
  const body = document.querySelector('body')! // bodyは存在するはず
  let scrollTop = 0 // スクロール量
  let isStopScroll = false // スクロール禁止中か

  const toggleStopScroll = () => {
    if (isStopScroll === true) {
      // スクロール禁止を解除する

      // 各スタイルを初期値で更新
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.position = 'static'
      body.style.overflow = 'visible'
      // スクロール禁止中かフラグを更新
      isStopScroll = false
      // スクロール値をセット
      window.scrollTo(0, scrollTop)
    } else {
      // スクロール禁止する

      // 現在のスクロール量を確保
      scrollTop = window.scrollY
      // 各スタイルをスクロール禁止用に更新
      body.style.top = scrollTop * -1 + 'px'
      body.style.left = '0'
      body.style.right = '0'
      body.style.position = 'fixed'
      body.style.overflow = 'hidden'
      // スクロール禁止中かフラグを更新
      isStopScroll = true
    }
  }

  return {
    toggleStopScroll, // スクロール禁止を切り替える関数
    scrollTop, // スクロール量
    isStopScroll // スクロール禁止中か
  }
}
