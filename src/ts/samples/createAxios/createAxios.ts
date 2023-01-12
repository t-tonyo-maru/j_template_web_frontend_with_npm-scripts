import axios, { AxiosInstance, ResponseType } from 'axios'

export type CreateAxiosArgsType = {
  baseURL?: string
  timeout?: number
  responseType?: ResponseType
}

export type CreateAxiosType = ({
  baseURL,
  timeout,
  responseType
}: Readonly<CreateAxiosArgsType>) => AxiosInstance

const defaultBaseURL = 'http://localhost:3000'
const defaultTimeout = 3 * 60 * 1000 // 3分
const defaultResponseType = 'json'

/**
 * 引数のオブジェクトに応じた axios のインスタンスを生成する<br/>
 * .getや、.postメソッドにresponseの型情報をジェネリクスで渡す事も可能
 * Axios: https://axios-http.com/
 *
 * @param args - axios の設定情報
 * @param {string} args.baseURL - API のエンドポイント
 * @param {number} args.timeout - タイムアウト時間（ミリ秒）
 * @param {ResponseType} args.responseType - レスポンスタイプ
 * @return {object} - axios のインスタンス
 */
export const createAxios: CreateAxiosType = (
  { baseURL, timeout, responseType } = {
    baseURL: defaultBaseURL,
    timeout: defaultTimeout,
    responseType: defaultResponseType
  }
) => {
  return axios.create({
    baseURL: typeof baseURL !== 'undefined' ? baseURL : defaultBaseURL,
    timeout: typeof timeout !== 'undefined' ? timeout : defaultTimeout,
    responseType:
      typeof responseType !== 'undefined' ? responseType : defaultResponseType
  })
}
