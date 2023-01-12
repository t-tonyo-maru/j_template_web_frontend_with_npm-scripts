// ES2022の型定義を読み込み
import 'typescript/lib/lib.es2022'

/**
 * 引数の文字列の長さを返す関数
 * ES2022のIntl.Segmenterを利用して、文字列の長さを取得します
 * Intl.Segmenterはサロゲートペアの文字列も数える事が可能です。
 *
 * ※2022.09時点でFireFoxが、Intl.Segmenterを未サポートです。
 * FireFoxも対応ブラウザに入る場合は、[graphemesplit](https://www.npmjs.com/package/graphemesplit)を利用しましょう。
 *
 * @param {string} target - 対象の文字列
 * @return {number} - 対象の文字列の長さ
 */
export const countStr = (target: string) => {
  // Segmenterオブジェクトを作成
  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })
  // 文字列をセグメントに分割
  const segments = segmenter.segment(target)
  return [...segments].length
}
