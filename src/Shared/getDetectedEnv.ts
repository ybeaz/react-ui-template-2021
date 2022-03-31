export const getDetectedEnv: Function = (): string => {
  return location.hostname === '127.0.0.1' || location.hostname === 'localhost'
    ? 'localServer'
    : location.hostname === '127.0.0.1' && location.port === '3550'
    ? 'localWebpack'
    : 'remote'
}
