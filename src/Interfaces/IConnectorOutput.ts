import { Axios, Method } from 'axios'
export interface IConnectorOutput {
  client: Axios
  params?: {
    operationName: string
    variables: any
    query: string
  }
}

export { Method } from 'axios'
