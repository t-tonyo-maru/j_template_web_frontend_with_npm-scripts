import {
  floor,
  ceil,
  round,
  trunc,
  getRadian,
  getDegree,
  getRandom,
  convertToDecimal,
  convertToAnyHexadecimal
} from './mathUtil'

describe('mathUtil: テスト', () => {
  // getRandom: 乱数テスト
  it('getRandom: 乱数テスト: 1..=10', () => {
    const min = 1
    const max = 10
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  it('getRandom: 乱数テスト: 0..=1', () => {
    const min = 0
    const max = 1
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  it('getRandom: 乱数テスト: 30..=40', () => {
    const min = 30
    const max = 40
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  it('getRandom: 乱数テスト: 1..=1', () => {
    const min = 1
    const max = 1
    const target = getRandom({ min, max })
    expect(min <= target && target <= max).toBe(true)
  })

  // floor（切り捨て） テスト
  it('floor（切り捨て） テスト: 100.1112の小数点第3桁まで切り捨て = 100.111', () => {
    expect(floor({ n: 100.1112, d: 3 })).toBe(100.111)
  })
  it('floor（切り捨て） テスト: 16.345の小数点第0桁まで切り捨て = 16', () => {
    expect(floor({ n: 16.345, d: 0 })).toBe(16)
  })
  it('floor（切り捨て） テスト: 21.8345の小数点第1桁まで切り捨て = 21.8', () => {
    expect(floor({ n: 21.8345, d: 1 })).toBe(21.8)
  })
  it('floor（切り捨て） テスト: 231.56872の小数点第4桁まで切り捨て = 231.5687', () => {
    expect(floor({ n: 231.56872, d: 4 })).toBe(231.5687)
  })

  // ceil（切り上げ） テスト
  it('ceil（切り上げ） テスト: 100.1112の小数点第3桁まで切り上げ = 100.112', () => {
    expect(ceil({ n: 100.1112, d: 3 })).toBe(100.112)
  })
  it('ceil（切り上げ） テスト: 16.345の小数点第0桁まで切り上げ = 17', () => {
    expect(ceil({ n: 16.345, d: 0 })).toBe(17)
  })
  it('ceil（切り上げ） テスト: 21.8345の小数点第1桁まで切り上げ = 21.9', () => {
    expect(ceil({ n: 21.8345, d: 1 })).toBe(21.9)
  })
  it('ceil（切り上げ） テスト: 231.56872の小数点第4桁まで切り上げ = 231.5688', () => {
    expect(ceil({ n: 231.56872, d: 4 })).toBe(231.5688)
  })

  // round（四捨五入） テスト
  it('round（四捨五入） テスト: 100.1112の小数点第3桁まで四捨五入 = 100.111', () => {
    expect(round({ n: 100.1112, d: 3 })).toBe(100.111)
  })
  it('round（四捨五入） テスト: 16.345の小数点第0桁まで四捨五入 = 16', () => {
    expect(round({ n: 16.345, d: 0 })).toBe(16)
  })
  it('round（四捨五入） テスト: 21.8345の小数点第1桁まで四捨五入 = 21.8', () => {
    expect(round({ n: 21.8345, d: 1 })).toBe(21.8)
  })
  it('round（四捨五入） テスト: 231.56872の小数点第4桁まで四捨五入 = 231.5687', () => {
    expect(round({ n: 231.56872, d: 4 })).toBe(231.5687)
  })

  // trunc（整数を取得） テスト
  it('trunc（整数を取得） テスト: 100.1112の整数部分を取得 = 100', () => {
    expect(trunc({ n: 100.1112 })).toBe(100)
  })
  it('trunc（整数を取得） テスト: 16.345の整数部分を取得 = 16', () => {
    expect(trunc({ n: 16.345 })).toBe(16)
  })
  it('trunc（整数を取得） テスト: 21.8345の整数部分を取得 = 21', () => {
    expect(trunc({ n: 21.8345 })).toBe(21)
  })
  it('trunc（整数を取得） テスト: 231.56872の整数部分を取得 = 231', () => {
    expect(trunc({ n: 231.56872 })).toBe(231)
  })

  // 度からラジアンを取得する関数（getRadian）テスト
  it('getRadian_テスト: 0度 = 0', () => {
    expect(floor({ n: getRadian(0), d: 2 })).toBe(0)
  })
  it('getRadian_テスト: 30度 = 0.52', () => {
    expect(floor({ n: getRadian(30), d: 2 })).toBe(floor({ n: 0.523599, d: 2 }))
  })
  it('getRadian_テスト: 45度 = 0.78', () => {
    expect(floor({ n: getRadian(45), d: 2 })).toBe(floor({ n: 0.785398, d: 2 }))
  })
  it('getRadian_テスト: 90度 = 1.57', () => {
    expect(floor({ n: getRadian(90), d: 2 })).toBe(floor({ n: 1.5708, d: 2 }))
  })
  it('getRadian_テスト: 120度 = 2.09', () => {
    expect(floor({ n: getRadian(120), d: 2 })).toBe(floor({ n: 2.0944, d: 2 }))
  })
  it('getRadian_テスト: 180度 = 3.14', () => {
    expect(floor({ n: getRadian(180), d: 2 })).toBe(floor({ n: 3.14159, d: 2 }))
  })
  it('getRadian_テスト: 215度 = 3.75', () => {
    expect(floor({ n: getRadian(215), d: 2 })).toBe(floor({ n: 3.75246, d: 2 }))
  })
  it('getRadian_テスト: 270度 = 4.71', () => {
    expect(floor({ n: getRadian(270), d: 2 })).toBe(floor({ n: 4.71239, d: 2 }))
  })
  it('getRadian_テスト: 315度 = 5.49', () => {
    expect(floor({ n: getRadian(315), d: 2 })).toBe(floor({ n: 5.49779, d: 2 }))
  })
  it('getRadian_テスト: 360度 = 6.28', () => {
    expect(floor({ n: getRadian(360), d: 2 })).toBe(floor({ n: 6.28319, d: 2 }))
  })

  // 度からラジアンを取得する関数（getDegree）テスト
  it('getDegree_テスト: 度 = 0', () => {
    expect(getDegree(0)).toBe(0)
  })
  it('getDegree_テスト: ラジアン:0.523599 = 30度', () => {
    expect(floor({ n: getDegree(0.523599), d: 0 })).toBe(floor({ n: 30, d: 1 }))
  })
  test.skip('getDegree_テスト: ラジアン:0.785398 = 45度', () => {
    expect(floor({ n: getDegree(0.785398), d: 0 })).toBe(floor({ n: 45, d: 1 }))
  })
  it('getDegree_テスト: ラジアン:1.5708 = 90度', () => {
    expect(floor({ n: getDegree(1.5708), d: 0 })).toBe(floor({ n: 90, d: 1 }))
  })
  it('getDegree_テスト: ラジアン:2.0944 = 120度', () => {
    expect(floor({ n: getDegree(2.0944), d: 0 })).toBe(floor({ n: 120, d: 1 }))
  })
  test.skip('getDegree_テスト: ラジアン:3.14159 = 180度', () => {
    expect(floor({ n: getDegree(3.14159), d: 0 })).toBe(floor({ n: 180, d: 1 }))
  })
  it('getDegree_テスト: ラジアン:3.75246 = 215度', () => {
    expect(floor({ n: getDegree(3.75246), d: 0 })).toBe(floor({ n: 215, d: 1 }))
  })
  it('getDegree_テスト: ラジアン:4.71239 = 270度', () => {
    expect(floor({ n: getDegree(4.71239), d: 0 })).toBe(floor({ n: 270, d: 1 }))
  })
  it('getDegree_テスト: ラジアン:5.49779 = 315度', () => {
    expect(floor({ n: getDegree(5.49779), d: 0 })).toBe(floor({ n: 315, d: 1 }))
  })
  it('getDegree_テスト: ラジアン:6.28319 = 360度', () => {
    expect(floor({ n: getDegree(6.28319), d: 0 })).toBe(floor({ n: 360, d: 1 }))
  })

  // convertToDecimal: h進数 → 10進数テスト
  it('convertToDecimal_テスト: 2進数: 1010 => 10', () => {
    expect(convertToDecimal({ n: '1010', th: 2 })).toBe(10)
  })
  it('convertToDecimal_テスト: 2進数: 10010111 => 10', () => {
    expect(convertToDecimal({ n: '10010111', th: 2 })).toBe(151)
  })
  it('convertToDecimal_テスト: 8進数: 70 => 56', () => {
    expect(convertToDecimal({ n: '70', th: 8 })).toBe(56)
  })
  it('convertToDecimal_テスト: 8進数: 16701 => 7617', () => {
    expect(convertToDecimal({ n: '16701', th: 8 })).toBe(7617)
  })
  it('convertToDecimal_テスト: 16進数: fa => 250', () => {
    expect(convertToDecimal({ n: 'fa', th: 16 })).toBe(250)
  })
  it('convertToDecimal_テスト: 16進数: 13dffa => 1302522', () => {
    expect(convertToDecimal({ n: '13dffa', th: 16 })).toBe(1302522)
  })

  // convertToAnyHexadecimal: h進数 → 10進数テスト
  it('convertToAnyHexadecimal_テスト: 123 => 2進数: 1111011', () => {
    expect(convertToAnyHexadecimal({ n: 123, rh: 2 })).toBe('1111011')
  })
  it('convertToAnyHexadecimal_テスト: 13446 => 2進数: 11010010000110', () => {
    expect(convertToAnyHexadecimal({ n: 13446, rh: 2 })).toBe('11010010000110')
  })
  it('convertToAnyHexadecimal_テスト: 123 => 8進数: 173', () => {
    expect(convertToAnyHexadecimal({ n: 123, rh: 8 })).toBe('173')
  })
  it('convertToAnyHexadecimal_テスト: 446 => 8進数: 676', () => {
    expect(convertToAnyHexadecimal({ n: 446, rh: 8 })).toBe('676')
  })
  it('convertToAnyHexadecimal_テスト: 123 => 16進数: 7b', () => {
    expect(convertToAnyHexadecimal({ n: 123, rh: 16 }).toLowerCase()).toBe('7b')
  })
  it('convertToAnyHexadecimal_テスト: 12312876 => 16進数: bbe12c', () => {
    expect(convertToAnyHexadecimal({ n: 12312876, rh: 16 }).toLowerCase()).toBe(
      'bbe12c'
    )
  })
})
