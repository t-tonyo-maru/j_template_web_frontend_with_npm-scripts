/**
 * target引数を任意の桁数digitsで0詰めします
 *
 * @param {number} digits - 0詰めする桁数（正の整数であること）
 * @param {number | string} target - 0詰め対象の数値
 * @return {string} - 0詰め後の数値
 */
export const createPadZero = (digits: number) => {
  return (target: number | string) => {
    const result = typeof target === 'string' ? target : target.toString(10)
    return result.slice(digits * -1).padStart(digits, '0')
  }
}
