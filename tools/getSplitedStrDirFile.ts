export const getSplitedStrDirFile = (str: string = '') => {
  const res = str && str.match(/^(.*[\\\/])/gim) && str?.match(/^(.*[\\\/])/gim)
  const res1 = res && res.length && str.split(res[0])[1]

  let dir = res,
    file = res1
  if (!res && !res1) {
    dir = ''
    file = str
  }

  return { dir, file }
}
