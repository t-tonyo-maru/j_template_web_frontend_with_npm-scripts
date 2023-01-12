/**
 * TypeScriptでよく扱う組み込み型関数（Utility Types）のサンプル
 * [> Utility Types | TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)
 * [> ユーティリティ型 (utility type) | サバイバルTypeScript](https://typescriptbook.jp/reference/type-reuse/utility-types)
 */

type SampleUser = {
  id: number
  name: string
  age: number
  email?: string
}
type getSampleUser = (user: SampleUser, num: number) => SampleUser

/**
 * Partial<T>
 * 型のすべてのプロパティに(| undefined)を付与する。
 * オプションとなる引数を作成する時に便利。
 */
type PartialUser = Partial<SampleUser>
// type PartialUser = {
//   id?: number | undefined;
//   name?: string | undefined;
//   age?: number | undefined;
//   email?: string | undefined;
// }

/**
 * Required<T>
 * 型Tのすべてのプロパティを必須化する
 */
type RequiredUser = Required<SampleUser>
// type RequiredUser = {
//   id: number;
//   name: string;
//   age: number;
//   email: string; // emailが必須化されます。
// }

/**
 * Readonly<T>
 * 型Tのすべてのプロパティにreadonly属性を付与します。
 * readonly属性の付与は、あくまでT型の直下のプロパティに対してのみです。再帰的なreadonlyの付与は行われません。
 * 再帰的なreadonly属性の付与はconstアサーションで可能です。
 */
type ReadonlyUser = Readonly<SampleUser>
// type ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
//   readonly age: number;
//   readonly email?: string | undefined;
// }

/**
 * Pick<T, K extends keyof T>
 * 型Tから任意のプロパティを抽出した型を生成します。
 */
type PickUser = Pick<SampleUser, 'id' | 'name'>
// type PickUser = {
//   id: number;
//   name: string;
// }

/**
 * Omit<T, K extends keyof T>
 * 型Tから任意のプロパティを排除した型を生成します。Pickの逆パターンです。
 */
type OmitUser = Omit<SampleUser, 'id' | 'name'>
// type OmitUser = {
//   age: number;
//   email?: string | undefined;
// }

/**
 * Record<K, T>
 * Kをkey。Tをvalueの型とする型を生成します。
 * 以下のサンプルでは、keyofを利用してSampleUserのキーをすべて抽出し、そのすべてをstring型とした型を生成しています。
 */
type RecordUser = Record<keyof SampleUser, string>
// type RecordUser = {
//   id: string; // string 型になっています
//   name: string;
//   age: string; // string 型になっています
//   email: string; // string 型になっています
// }

/**
 * NonNullable<T>
 * 型Tからnullとundefinedを取り除きます。
 * Readonlyにように型Tのプロパティ自体に適用されるわけではないので、注意。
 */
type NonNullableSample = NonNullable<number | string | null | undefined>
// type NonNullableSample = string | number
type NonNullableUser = NonNullable<SampleUser>
// type NonNullableUser = {
//   id: number;
//   name: string;
//   age: number;
//   email?: string | undefined; // プロパティの(| undefined)は取り除かれない。
// }

/**
 * Parameters<T>
 * T型(関数型)の引数の型を抽出し、新しい型として生成します。生成される型はタプル型になります。
 * typeof 関数を格納した変数を、ジェネリクスに入れて利用することが多いでしょう。
 */
type ParametersType00 = Parameters<() => void>
// type ParametersType00 = [] // 空配列
type ParametersType01 = Parameters<getSampleUser>
// type ParametersType01 = [user: SampleUser, num: number] // タプル型

/**
 * ReturnType<T>
 * T型(関数型)の戻り値の型を抽出し、新しい型として生成します。
 * Parametersと同じく、typeof 関数を格納した変数を、ジェネリクスに入れて利用することが多いでしょう。
 */
type ReturnTypeType00 = ReturnType<() => void>
// type ReturnTypeType00 = void
type ReturnTypeType01 = ReturnType<getSampleUser>
// type ReturnTypeType01 = SampleUser

/**
 * Awaited<T>
 * Promiseの戻り値から型を生成します
 */
type AwaitedType00 = Awaited<Promise<string>>
// type AwaitedType00 = string
type AwaitedType01 = Awaited<boolean | Promise<number>>
// type AwaitedType01 = number | boolean

/**
 * Exclude<T, U>
 * 型Tから型Uを取り除いた型を生成します。
 * もし、型Tが型Uと一致している（もしくは部分集合）であるなら、never型になります。
 */
type ExcludeType00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>
// type ExcludeType00 = "b" | "d"
type ExcludeType01 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c' | 'd'>
// type ExcludeType01 = never

/**
 * Extract<T, U>
 * 型Tから型Uと一致する型を抽出した型を生成します。
 * もし、型Tと型Uで一致する部分がない場合は、never型になります。
 */
type ExtractType00 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>
// type ExtractType00 = "a" | "c"
type ExtractType01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c' | 'd'>
// type ExtractType01 = "a" | "b" | "c" | "d"
