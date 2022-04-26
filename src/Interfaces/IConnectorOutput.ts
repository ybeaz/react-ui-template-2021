import { Axios, Method } from 'axios'
export interface IConnectorOutput {
  testCapture: string
  axiosClient: Axios
  method: Method
  params?: {
    operationName: string
    variables: any
    query: string
  }
}

export { AxiosRequestHeaders, Method } from 'axios'
