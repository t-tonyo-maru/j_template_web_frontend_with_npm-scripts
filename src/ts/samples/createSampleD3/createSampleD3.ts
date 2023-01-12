import * as d3 from 'd3'

/**
 * D3.jsのサンプル関数です。<br/>
 * D3.jsはSVG/Canvasを利用して図を描画するデータビジュアライゼーション用ライブラリです。<br/>
 * 拡張性・柔軟性が非常に高く、様々な図に対応できます。
 * D3.js: https://d3js.org/
 * D3.js: gallery: https://observablehq.com/@d3/gallery
 *
 * @param args - D3.jsサンプル展開用の引数
 * @param {string} args.selector - D3.jsのサンプルを展開するエリアのcssセレクタ。
 */
export const createSampleD3BarChart = ({
  selector
}: Readonly<{ selector: string }>) => {
  // svgのサイズ
  const width = 600
  const height = 400
  // メモリ分のpadding
  const padding = 30
  const dataset = [
    { name: 'A', value: 5 },
    { name: 'B', value: 6 },
    { name: 'C', value: 8 },
    { name: 'D', value: 1 },
    { name: 'E', value: 2 },
    { name: 'F', value: 6 },
    { name: 'G', value: 8 },
    { name: 'H', value: 6 },
    { name: 'I', value: 10 },
    { name: 'J', value: 9 }
  ]

  // svg要素を生成
  const svg = d3
    .select(selector)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // ツールチップ用のdivタグを生成
  const tooltip = d3
    .select(selector)
    .append('div')
    .style('position', 'absolute')
    .style('text-align', 'center')
    .style('width', 'auto')
    .style('height', 'auto')
    .style('padding', '5px')
    .style('font', '12px')
    .style('background', 'white')
    .style('box-shadow', '0px 0px 20px rgba(0, 0, 0, 0.8)')
    .style('visibility', 'hidden')

  // x軸のデータを生成
  const xScale = d3
    .scaleBand()
    .rangeRound([padding, width - padding])
    .padding(0.1)
    .domain(dataset.map((d) => d.name))

  // y軸のデータを生成
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.value)!])
    // rangeの最大値と最小値を逆転させる事で、描画エリア下部を原点とする
    .range([height - padding, padding])

  // x, y軸のデータから、それぞれのメモリを生成
  const axisX = d3.axisBottom(xScale)
  const axisY = d3.axisLeft(yScale)

  // x軸メモリをsvgとして描画
  svg
    .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(axisX)

  // y軸メモリをsvgとして描画
  // prettier-ignore
  svg
    .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(axisY)

  // データを棒グラフ形式にして、svgとして描画
  svg
    .append('g')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d.name)!)
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height - padding - yScale(d.value))
    .attr('fill', 'steelblue')
    // svgのrect要素に対して、マウス&タッチイベントを設定
    .on('mouseover', (_event, d) => {
      // ツールチップ表示
      tooltip
        .style('visibility', 'visible')
        .html(`name : ${d.name}<br/>value : ${d.value}`)
    })
    .on('mousemove', (event) => {
      // ツールチップをマウスに追従させる
      tooltip
        .style('top', `${event.pageY - 20}px`)
        .style('left', `${event.pageX + 10}px`)
    })
    .on('mouseout', () => {
      // ツールチップ非表示
      // prettier-ignore
      tooltip
        .style('visibility', 'hidden')
    })
}

/**
 * D3.jsのサンプル関数です。<br/>
 * バブルチャートをCanvasに描画しています。<br/>
 * D3.jsの組み込み関数を用いて、zoomできるようになっています。（PC/SP両対応）<br/>
 * また、Canvas上の要素をクリックした時の処理も実装しています。
 *
 * @param args - D3.jsサンプル展開用の引数
 * @param {string} args.selector - D3.jsのサンプルを展開するエリアのcssセレクタ。
 */
export const createSampleD3BubbleChartOnCanvas = ({
  selector
}: Readonly<{
  selector: string
}>) => {
  // データの範囲
  const dataRange = {
    x: {
      min: 0,
      max: 999999
    },
    y: {
      min: 0,
      max: 999999
    }
  }
  // zoom処理中か
  let isZooming = false
  // 現在のzoomの状態
  const zoomStatus = {
    k: 1,
    x: 0,
    y: 0
  }
  // 円の色
  const circleColor = '#3585ff'
  // マージン
  const margin = {
    top: 20,
    right: 15,
    bottom: 60,
    left: 70
  }
  const outerWidth = 600
  const outerHeight = 600
  const width = outerWidth - margin.left - margin.right
  const height = outerHeight - margin.top - margin.bottom

  // サンプルデータ: 円の配列[x軸の位置, y軸の位置, 半径（データの大きさに相当）, 連番（0スタート）]
  const dataExample: [number, number, number, number][] = []

  for (let i = 0; i < 1000; i++) {
    const x = Math.floor(Math.random() * dataRange.x.max) + 1
    const y = Math.floor(Math.random() * dataRange.y.max) + 1
    const r = Math.floor(Math.random() * 5000) + 1
    dataExample.push([x, y, r, i])
  }

  // コンテナの設定
  const container = d3
    .select(selector)
    .style('margin', '0 auto 0 0')
    .style('width', `${outerWidth}px`)
    .style('height', `${outerHeight}px`)

  // svgを生成
  const svgChart = container
    .append('svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight)
    .style('position', 'absolute')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // canvasを生成
  const canvasChart = container
    .append('canvas')
    .attr('width', width)
    .attr('height', height)
    .style('margin-left', `${margin.left}px`)
    .style('margin-top', `${margin.top}px`)
    .style('position', 'absolute')

  // ボタンを取りまとめるdivを生成
  const toolsList = container
    .append('div')
    .style('position', 'absolute')
    .style('left', `${outerWidth}px`)
    .style('visibility', 'visible')
    .style('z-index', '1')

  // zoom resetを行うボタンを生成
  const resetButton = toolsList.append('button').text('Zoom Reset')
  resetButton.on('click', () => {
    const t = d3.zoomIdentity.translate(0, 0).scale(1)
    canvasChart
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .call(zoom_function.transform, t)
  })

  const context = canvasChart
    .node()!
    .getContext('2d') as CanvasRenderingContext2D

  // x軸のデータを生成
  const x = d3
    .scaleLinear()
    .domain([0, dataRange.x.max]) // d3.max(dataExample, (d) => d[0])!
    .range([0, width])
    .nice()
  // y軸のデータを生成
  const y = d3
    .scaleLinear()
    .domain([0, dataRange.y.max]) // d3.max(dataExample, (d) => d[1])!
    .range([height, 0])
    .nice()

  // x, y軸を生成
  const xAxis = d3.axisBottom(x)
  const yAxis = d3.axisLeft(y)

  // x, y軸をsvgとして描画
  const gxAxis = svgChart
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
  // prettier-ignore
  const gyAxis = svgChart
    .append('g')
    .call(yAxis)

  // x, y軸にラベルを追加
  svgChart
    .append('text')
    .attr('x', `-${height / 2}`)
    .attr('dy', '-3.5em')
    .attr('transform', 'rotate(-90)')
    .text('Axis Y')
  svgChart
    .append('text')
    .attr('x', `${width / 2}`)
    .attr('y', `${height + 40}`)
    .text('Axis X')

  // zoom時の関数
  const zoom_function = d3
    .zoom<HTMLCanvasElement, unknown>()
    .scaleExtent([1, 1000])
    .on('start', () => {
      // ズーム開始
      isZooming = true
    })
    .on('zoom', (event) => {
      const transform = event.transform
      context.save()
      draw(transform)
      context.restore()
    })
    .on('end', ({ transform }: { transform: typeof zoomStatus }) => {
      // ズームの状態を更新
      zoomStatus.k = transform.k
      zoomStatus.x = transform.x
      zoomStatus.y = transform.y
      // ズーム終了
      isZooming = false
    })

  const draw = (transform: any) => {
    const scaleX = transform.rescaleX(x)
    const scaleY = transform.rescaleY(y)
    // x, y軸を拡大率に応じて更新する
    gxAxis.call(xAxis.scale(scaleX))
    gyAxis.call(yAxis.scale(scaleY))

    // canvasをクリア
    context.clearRect(0, 0, width, height)

    // データを描画
    dataExample.forEach((point) => {
      context.beginPath()
      context.fillStyle = circleColor
      const px = scaleX(point[0])
      const py = scaleY(point[1])
      // 円の半径（実数値）を、canvas上の1pxあたりのメモリ上の距離（拡大率も加味）した数値で除算して、canvas上でのレンダリングサイズを算出する
      const pr = point[2] / (dataRange.x.max / width / transform.k)
      context.arc(px, py, pr, 0, 2 * Math.PI, true)
      context.fill()
    })
  }

  // 初期描画を実行する
  draw(d3.zoomIdentity)

  // Canvasをzoom&drugに対応させる
  canvasChart
    .call(zoom_function) // ズームを適用
    .on('dblclick.zoom', null) // ダブルクリックによるズームは解除する

  canvasChart.on('pointerdown', (event) => {
    console.clear()
    // ズーム中は処理を中断する
    if (isZooming === true) return

    // ズームの状態をセット
    const transform = d3.zoomIdentity
      .translate(zoomStatus.x, zoomStatus.y)
      .scale(zoomStatus.k)

    // pointerdownのイベントオブジェクトから、押下地点の比率を計算
    const points = d3.pointer(event)
    const pointRatoX = points[0] / width
    const pointRatoY = 1 - points[1] / height // y軸が下へ行けば、行くほど正に増大するため。天地を逆転させる

    // (a1) データの範囲の最大値: dataRange.x.max
    // (a2) 現在の拡大率: transform.k
    // (a3) (a1)と(a2)より、現在の拡大率を考慮した横軸の長さ: (dataRange.x.max / transform.k)
    // (a4) クリックした地点のcanvas上のxの比率（画面左下原点とする）: pointRatoX
    // (a5) (a3)と(a4)より、クリックした地点と画面左下原点との距離（pxではなく、メモリ換算）: (dataRange.x.max / transform.k) * pointRatoX)
    // -----
    // (b1) 画面左下原点からの見切れの距離（単位はpx）: transform.x
    // (b2) canvas上の1pxあたりのメモリ上の距離（等倍）: dataRange.x.max / width
    // (b3) canvas上の1pxあたりのメモリ上の距離（拡大率で除算する事で、拡大率も加味する）: dataRange.x.max / width / transform.k
    // (b4) (b1)と(b3)より、画面左下原点からの見切れの距離をメモリ換算する: transform.x * dataRange.x.max / width / transform.k
    // =====
    // 結果: (a5) + (b4)で、xの位置（メモリ換算）を取得できる
    // prettier-ignore
    const pointerDownX = (dataRange.x.max / transform.k) * pointRatoX + (transform.x * dataRange.x.max / width / transform.k) * -1

    // (a1) データの範囲の最大値: dataRange.y.max
    // (a2) 現在の拡大率: transform.k
    // (a3) (a1)と(a2)より、現在の拡大率を考慮した縦軸の長さ: (dataRange.y.max / transform.k)
    // (a4) クリックした地点のcanvas上のyの比率（画面左下原点とする）: pointRatoY
    // (a5) (a3)と(a4)より、クリックした地点と画面左下原点との距離（pxではなく、メモリ換算）: (dataRange.y.max / transform.k) * pointRatoY)
    // -----
    // (b1) 画面左下原点からの見切れの距離（単位はpx）: transform.y
    // (b2) canvas上の1pxあたりのメモリ上の距離（等倍）: dataRange.y.max / width
    // (b3) canvas上の1pxあたりのメモリ上の距離（拡大率で除算する事で、拡大率も加味する）: dataRange.y.max / width / transform.k
    // (b4) (b1)と(b3)より、画面左下原点からの見切れの距離をメモリ換算する: transform.y * dataRange.y.max / height / transform.k
    //    ↑※ただし、(b4)はcanvas左端上部を原点とした場合。つまり、y軸左端上部からのy軸の見切れの距離。
    // (b5) y軸範囲の最大数から(4)を引いた距離（つまり、画面上のy軸メモリの最大値）: dataRange.y.max - ((transform.y * dataRange.y.max / height / transform.k) * -1)
    // (b6) canvas上に表示されているy軸メモリ全体の距離: dataRange.y.max / transform.k
    // (b7) canvas上に表示されているy軸メモリ左端下部の値: (dataRange.y.max - ((transform.y * dataRange.y.max / height / transform.k) * -1) - dataRange.y.max / transform.k)
    // =====
    // 結果: (a5) + (b7)で、yの位置（メモリ換算）を取得できる
    // prettier-ignore
    const pointerDownY = (dataRange.y.max / transform.k) * pointRatoY + (dataRange.y.max - ((transform.y * dataRange.y.max / height / transform.k) * -1) - dataRange.y.max / transform.k)

    dataExample.map((point) => {
      // (a1) 三平方の定理から、円の中心点(x,y)とクリック地点(x,y)間における直線距離（ユークリッド距離）を算出する
      // prettier-ignore
      const d = Math.sqrt(Math.pow(Math.ceil((point[0] - pointerDownX)), 2) + Math.pow(Math.ceil((point[1] - pointerDownY)), 2))
      // (2) (a1)が円の半径より小さい場合はクリックしているはず
      // 重なり上の最上部のみをクリック判定としたい場合は、サンプルデータの連番（point[3]）から判定できる
      if (d <= point[2]) {
        console.log(`${point[3]}をclickしました`)
      }
    })
  })
}

/**
 * D3.jsのサンプル関数です。<br/>
 * コンター図の描画です。
 *
 * @param args - D3.jsサンプル展開用の引数
 * @param {string} args.selector - D3.jsのサンプルを展開するエリアのcssセレクタ。
 */
export const createSampleD3BarContours = ({
  selector
}: Readonly<{
  selector: string
}>) => {
  const width = 800 // グラフの幅
  const height = 800 // グラフの高さ

  // コンター図用のデータを生成
  // コンター用のデータ(values)はn(x方向の配列要素数) × m(y方向の配列要素数)の要素数をもつ一次元配列として設定する必要がある。
  const calc = (x: number, y: number) => {
    // prettier-ignore
    return (x * x + y - 11) * (x * x + y - 11) + (x + y * y - 7) * (x + y * y - 7)
  }
  const n = 240
  const m = 125
  let k = 0
  const values = new Array(n * m)
  for (let j = 0; j < m; ++j) {
    for (let i = 0; i < n; ++i) {
      const x = (i / (n - 1)) * 10 - 5
      const y = (j / (m - 1)) * 10 - 5
      values[k] = calc(x, y)
      ++k
    }
  }

  // canvas領域の設定
  const canvasChart = d3
    .select(selector)
    .append('canvas')
    .attr('width', width)
    .attr('height', height)

  const context = canvasChart
    .node()!
    .getContext('2d') as CanvasRenderingContext2D

  // しきい値の設定
  // prettier-ignore
  const thresholds = d3
    .range(0, 20) // 0〜19コの20コ分の範囲でデータを生成
    .map((p) => p * 7) // 各データに7を乗算。これで範囲は [0, 7, 14, …, 126, 133] となる

  // コンター図の設定を生成
  // prettier-ignore
  const contours = d3
    .contours()
    .size([n, m]) // データサイズを指定。データの要素数: n(x方向の配列要素数) × m(y方向の配列要素数)のサイズ。
    .thresholds(thresholds) // しきい値を指定

  // カラースケールの設定
  const color = d3
    .scaleSequential((t) => {
      // domainで指定した値を0.0〜1.0に線形変換するため、''を追加して、文字列を返す。
      return d3.hsl(t * 230, 1, 0.5) + ''
      // d3.hslの第4引数はopacityとなる
      // return d3.hsl(t * 230, 1, 0.5, 0.5) + ''
    })
    .domain([140, 0]) // 140〜0の範囲を指定

  // 平面ジオメトリの生成: 拡大縮小・並行移動・クリップに利用可能なジオメトリオブジェクトを生成する
  const projection = d3.geoIdentity().scale(width / n)
  // 生成した平面ジオメトリの地理的なパスジェネレータを取得
  const path = d3.geoPath(projection, context)

  // 描画
  for (const contour of contours(values)) {
    if (contour.coordinates.length === 0) return
    context.fillStyle = color(contour.value)
    context.beginPath()
    path(contour)
    context.fill()
    context.closePath()
  }
}
