import { IConnectorOutput } from './IConnectorOutput'

export interface IConnectorOptions {
  method: string
  url: string
  headersAdd: any
}

export interface IConnector {
  (options?: IConnectorOptions): IConnectorOutput
}
