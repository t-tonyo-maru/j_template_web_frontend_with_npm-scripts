import { countStr } from './countStr'
// import { countStr } from '@/samples/countStr/countStr'

describe('ゼロパディング', () => {
  // 文字列カウントテスト
  it('aiueo = 5文字', () => {
    expect(countStr('aiueo')).toBe(5)
  })

  it('kakikukeko = 10文字', () => {
    expect(countStr('kakikukeko')).toBe(10)
  })

  it('𠮷野家 = 3文字', () => {
    expect(countStr('𠮷野家')).toBe(3)
  })

  it('😄💢✋ = 3文字', () => {
    expect(countStr('😄💢✋')).toBe(3)
  })

  it('👨‍👩‍👧‍👦 = 1文字', () => {
    expect(countStr('👨‍👩‍👧‍👦')).toBe(1)
  })
})
