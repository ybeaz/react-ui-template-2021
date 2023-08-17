interface GetDateStringProps {
  timestamp: Date
  dash: boolean
  hours: boolean
  minutes: boolean
  seconds: boolean
  rest: boolean
  style: string
}

interface GetDateString {
  (props: Partial<GetDateStringProps>): string
}

export const getDateString: GetDateString = ({
  timestamp = new Date(),
  dash = false,
  hours = true,
  minutes = true,
  seconds = false,
  rest = false,
  style = 'military',
}) => {
  const plus0 = (num: number) => `0${num.toString()}`.slice(-2)

  const d = new Date(timestamp)
  const separator = dash ? '-' : ' '
  const separator2 = dash ? '-' : ':'

  const year = d.getFullYear()
  const monthTmp = d.getMonth() + 1
  const month = plus0(monthTmp)
  const date = plus0(d.getDate())
  let hoursPlus = `${separator}${plus0(d.getHours())}`
  let minutesPlus = `${separator2}${plus0(d.getMinutes())}`
  let secondsPlus = `${separator2}${plus0(d.getSeconds())}`
  let restPlus = `${separator2}${timestamp.toString().slice(-5)}`

  hoursPlus = hours ? hoursPlus : ''
  minutesPlus = minutes ? minutesPlus : ''
  secondsPlus = seconds ? secondsPlus : ''
  restPlus = rest ? restPlus : ''

  let res = ''
  if (style === 'EU')
    res = `${date}/${month}/${year}${hoursPlus}${minutesPlus}${secondsPlus}${restPlus}`
  else if (style === 'US')
    res = `${month}/${date}/${year}${hoursPlus}${minutesPlus}${secondsPlus}${restPlus}`
  else
    res = `${year}-${month}-${date}${hoursPlus}${minutesPlus}${secondsPlus}${restPlus}`

  return res
}
