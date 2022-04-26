export interface IServer {
  remote: string
  localWebpack: string
  localServer: string
  timeout: number
}

export const SERVERS_AUTH: IServer = {
  remote: 'https://api.template.com',
  localWebpack: 'http://127.0.0.1:4020',
  localServer: 'http://127.0.0.1:4020',
  timeout: 5000,
}

export const SERVERS_ANALYTICS: IServer = {
  remote: 'https://analytics.template.com',
  localWebpack: 'http://127.0.0.1:8082',
  localServer: 'http://127.0.0.1:8082',
  timeout: 5000,
}

export const SERVERS: IServer = {
  remote: 'https://api.template.com',
  localWebpack: 'http://127.0.0.1:3440',
  localServer: 'http://127.0.0.1:3000',
  timeout: 5000,
}

export const URL_APP_BASE = 'https://futuralis.com'
