interface GetFilteredArrByIndexsType {
  (arrObj: any[], arrFilt: number[]): void
}

/**
 * @description Function to getFilteredArrByIndexs
 * @import import { getFilteredArrByIndexs } from './Shared/getFilteredArrByIndexs'
 */

export const getFilteredArrByIndexs: GetFilteredArrByIndexsType = (
  arrObj,
  arrFilt
) => {
  return arrObj.filter((_, index: number) => !arrFilt.includes(index))
}
