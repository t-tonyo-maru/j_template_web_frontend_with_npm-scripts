import keenSlider, { KeenSliderOptions } from 'keen-slider'

/**
 * keen-sliderのインスタンスを生成する関数<br/>
 * keen-slider: https://keen-slider.io/<br/>
 * keen-slider ドキュメント: https://keen-slider.io/docs<br/>
 * keen-slider サンプル: https://keen-slider.io/examples
 *
 * @param args - KeenSlider生成のためのオプション
 * @param {string} args.el - keen-sliderマウント先のhtml要素セレクター
 * @param {KeenSliderOptions} args.options - keen-sliderのオプション
 * @return {KeenSliderInstance<O, P, H>} keen-sliderのインスタンス
 */
export const createKeenSlider = ({
  el,
  options = {}
}: Readonly<{
  el: string
  options: KeenSliderOptions
}>) => {
  return new keenSlider(el, options)
}
