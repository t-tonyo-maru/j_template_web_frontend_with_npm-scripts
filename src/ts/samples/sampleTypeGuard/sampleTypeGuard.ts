interface PersonInterface {
  name: string
  age: number
}

class Person implements PersonInterface {
  public name: string
  public age: number
  constructor({ name, age }: PersonInterface) {
    this.name = ''
    this.age = 0
  }
}

/**
 * よく利用する Type Guard をまとめたもの<br/>
 * 例を分かりやすくため、引数を any にしています。実案件では unknown を利用すべきです。
 */
const run = (target: any) => {
  // 1. typeof による型ガード
  // JavaScript の typeof と同じ。したがって、typeof で判定できる型は、以下の7つしかない
  // bigint / boolean / function / number / object / string / symbol / undefined
  if (typeof target === 'string') {
    console.log(target.toUpperCase())
  }

  // 2. instanceof による型ガード
  // JavaScript の instanceof と同じ。したがって、instanceof の判定基準は Class である必要がある
  if (target instanceof Person) {
    console.log(target.name.toUpperCase())
    console.log(target.age.toString())
  }

  // 3. in による型ガード
  // JavaScript の in と同じ。プロパティが存在するかをチェックする。
  if (target !== null && typeof target !== 'undefined' && 'name' in target) {
    console.log(target.name)
  }

  // 4. ユーザー定義の型ガード
  // is 演算子を利用して型の絞り込む関数を自前で定義します。
  // 返り値が true の場合、引数は is 演算子の対象と同じ型であるはず。false であれば、異なる型のはずです。
  // ※ユーザーが自前で定義する関数のため、もし処理内容に不備があれば、正しい型判定は行われません。
  const isPersonInterface = (
    value: PersonInterface | any
  ): value is PersonInterface => {
    return (
      // null ではないこと
      value !== null &&
      // undefined ではないこと
      typeof value !== 'undefined' &&
      // name プロパティが存在する かつ name は文字列であること
      'name' in value &&
      typeof value.name === 'string' &&
      // age プロパティが存在する かつ age は数値であること
      'age' in value &&
      typeof value.age === 'number'
    )
  }
  if (isPersonInterface(target)) {
    console.log(target.name.toUpperCase())
  }
}
