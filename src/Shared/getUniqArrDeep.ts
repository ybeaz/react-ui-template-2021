/**
 * @description Function to return unique array of arbitrary types of values from basic to objects
 * @param arr: any[]
 * @returns arr: any[]
 */
export interface IGetUniqArrDeep {
  (arr: any[]): any[]
}

export const getUniqArrDeep: IGetUniqArrDeep = arr => {
  const arrStr = arr.map(item => JSON.stringify(item))
  return [...new Set(arrStr)].map(item => JSON.parse(item))
}
