type UserAgentResultType = {
  // isIE: boolean;
  isFireFox: boolean
  isChrome: boolean
  isSafari: boolean
  isEdge: boolean
  isIOS: boolean
  isAndroid: boolean
}

/**
 * ユーザーエージェントの判定結果を返す<br/>
 * ユーザーエージェントの文字列取得は段階的に固定化・削減化される予定です。<br/>
 * 将来的にユーザーエージェントはwindow.navigator.userAgentではなく、window.navigator.userAgentDataに統合されていく予定です。<br/>
 * ※2022.10時点で、window.navigator.userAgentDataに未対応のブラウザが多数あるため、まだwindow.navigator.userAgentによる判定を利用した方が良いでしょう。
 *
 * 参考サイト:<br/>
 * [> 最新のユーザーエージェント対応はどうするべきか？](https://ics.media/entry/200729/)<br/>
 * [> Navigator.userAgentData](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData)<br/>
 * [> Intent to Deprecate and Freeze: The User-Agent string](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)<br/>
 * [> 10 月の User-Agent 削減の変更に備える](https://developer.chrome.com/ja/blog/user-agent-reduction-oct-2022-updates/)
 *
 * @param {string} userAgent - window.navigator.userAgent に相当する文字列
 * @return {UserAgentInfoResultType} - window.navigator.userAgent の判定結果
 */
export const getUserAgentByString = (
  userAgent: string
): Readonly<UserAgentResultType> => {
  const target = userAgent.toLowerCase()
  return {
    // isIE: target.indexOf('msie') >= 0 || target.indexOf('trident') >= 0,
    isFireFox: target.indexOf('firefox') >= 0,
    isChrome: target.indexOf('chrome') >= 0,
    isSafari: target.indexOf('safari') >= 0 && !(target.indexOf('chrome') >= 0),
    isEdge: target.indexOf('edge') >= 0,
    isIOS: target.indexOf('ipad') >= 0 || target.indexOf('iphone') >= 0,
    isAndroid: target.indexOf('android') >= 0
  }
}

/**
 * @type {UserAgentDataType}
 * window.navigator.userAgentDataの型定義<br/>
 * ※2022.10時点で、window.navigator.userAgentDataに未対応のブラウザが多数あり、VSCodeも型定義をしないため、自作しています。
 */
type UserAgentDataType = {
  brands: { brand: string; version: string }[]
  mobile: boolean
  platform: string
}
/**
 * @type {UserAgentDataResultType}
 * window.navigator.userAgentData元にした、ユーザーエージェントの判定結果の返り値の型
 */
type UserAgentDataResultType = {
  isChrome: boolean
  isEdge: boolean
  isMobile: boolean
}

/**
 * window.navigator.userAgentDataを元に、ユーザーエージェントの判定結果を返す<br/>
 * ※2022.10時点で、window.navigator.userAgentDataに対応しているブラウザはGoogle Chrome / Edgeのみのため、利用は推奨しません。<br/>
 * window.navigator.userAgentが非推奨となり、window.navigator.userAgentDataに統合された段階で利用した方が良いでしょう。<br/>
 * もしくは if(window.navigator.userAgentData) などで存在チェックを行った上で利用しましょう。
 *
 * @param {UserAgentDataType} - window.navigator.userAgentDataの型定義。※2022.10時点で、window.navigator.userAgentDataに未対応のブラウザが多数あり、VSCodeも型定義をしないため、自作しています。
 * @return {}
 */
export const getUserAgentByData = (
  userAgentData: Readonly<UserAgentDataType>
): Readonly<UserAgentDataResultType> => {
  return {
    isChrome: userAgentData.brands.some((el) => el.brand === 'Google Chrome'),
    isEdge: userAgentData.brands.some((el) => el.brand === 'Microsoft Edge'),
    isMobile: userAgentData.mobile // モバイル端末か
  }
}
