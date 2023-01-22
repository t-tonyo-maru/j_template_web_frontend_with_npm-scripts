type MouseStalkerArgs = {
  className: string // マウスストーカーのクラス名
}

/**
 * Webページにマウスストーカーを仕込む関数
 *
 * @param args - マウスストーカーセット用の引数
 * @param {string | undefined} args.className - マウスストーカーのクラス名
 */
export const setMouseStalker = (args?: Partial<MouseStalkerArgs>) => {
  const params: MouseStalkerArgs = {
    className: args && args.className ? args.className : 'js_mouse_stalker'
  }
  const stalker = document.createElement('span')
  stalker.classList.add(params.className)
  document.body.appendChild(stalker)
  document.addEventListener('mousemove', (event) => {
    stalker.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  })
}
