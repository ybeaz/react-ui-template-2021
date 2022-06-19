import { Axios, Method } from 'axios'
export interface IConnectorOutput {
  client: Axios
  method: Method
  params?: {
    operationName: string
    variables: any
    query: string
  }
}

export { Method } from 'axios'
