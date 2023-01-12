import * as PIXI from 'pixi.js'

// consoleのバナーを非表示にする
PIXI.utils.skipHello()

/**
 * PixiJSのインスタンスを生成する関数<br/>
 * PixiJS: https://pixijs.com/<br/>
 * PixiJS ドキュメント: https://pixijs.download/release/docs/<br/>
 * PixiJS サンプル: https://pixijs.io/examples/
 *
 * @return {PIXI.Application} PixiJSアプリ
 */
export const createPixi = () => {
  // 画面解像度の比率
  const pixelRatio = window.devicePixelRatio || 1
  const app = new PIXI.Application({
    antialias: true,
    autoDensity: true, // 解像度1以外に対応できるよう、CSSピクセル単位でレンダラービューをリサイズできるようにするか否か
    resolution: pixelRatio / 1 // rendererのデバイスピクセル比
  })

  const graphics = new PIXI.Graphics()

  // Rectangle
  graphics.beginFill(0xde3249)
  graphics.drawRect(50, 50, 100, 100)
  graphics.endFill()
  // Rectangle + line style 1
  graphics.lineStyle(2, 0xfeeb77, 1)
  graphics.beginFill(0x650a5a)
  graphics.drawRect(200, 50, 100, 100)
  graphics.endFill()
  // Rectangle + line style 2
  graphics.lineStyle(10, 0xffbd01, 1)
  graphics.beginFill(0xc34288)
  graphics.drawRect(350, 50, 100, 100)
  graphics.endFill()

  // add stage
  app.stage.addChild(graphics)

  return app
}
