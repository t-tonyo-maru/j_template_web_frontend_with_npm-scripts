/**
 * ルーチンを実行する関数<br/>
 * setRoutineを実行するとルーチン管理オブジェクトが生成されます<br/>
 * routineObj.start()       : ルーチン開始（callback関数をinterval間隔で実行）<br/>
 * routineObj.stop()        : ルーチン一時停止<br/>
 * routineObj.getIsWorking(): ルーチンが実行中か取得
 *
 * @param args - ルーチン管理オブジェクト生成のためのオプション
 * @param {number} args.interval - ルーチンの実行間隔
 * @param {Function} args.callback - 実行されるコールバック関数
 * @return {Object} ルーチンを管理するオブジェクト
 */
export const setRoutine = ({
  interval = 5 * 1000,
  callback
}: Readonly<{
  interval: number
  callback: Function
}>) => {
  let timerId = -1
  const repeater = () => {
    callback()
    timerId = window.setTimeout(repeater, interval)
  }

  return {
    start: () => {
      if (timerId !== -1) return
      timerId = window.setTimeout(repeater, interval)
    },
    stop: () => {
      if (timerId === -1) return
      clearTimeout(timerId)
      timerId = -1
    },
    getIsWorking: () => timerId !== -1
  }
}
