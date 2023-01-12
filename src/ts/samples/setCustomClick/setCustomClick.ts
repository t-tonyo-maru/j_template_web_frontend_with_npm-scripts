/**
 * 「XX以外をクリックした時」のイベントをセットする<br/>
 * 判定には (closest)[https://developer.mozilla.org/ja/docs/Web/API/Element/closest] を利用する。
 *
 * @param args - イベントセット用の引数
 * @param {string} args.selector - 「XX以外をクリックした時」のXXに該当する要素のCSSセレクタ。
 */
export const setCustomClick = ({
  selector
}: Readonly<{ selector: string }>) => {
  document.addEventListener('click', (event) => {
    if (!event || !event.target) return
    const closestElement = (event.target as HTMLElement).closest(selector)
    if (!closestElement) {
      // selector に該当する要素以外をクリックした時
      console.log(`${selector}はクリックしませんでした`)
    } else {
      // selector に該当する要素をクリックした時
      console.log(`${selector}をクリックしました`)
    }
  })
}
