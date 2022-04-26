import axios from 'axios'

import {
  IConnectorOutput,
  AxiosRequestHeaders,
} from '../Interfaces/IConnectorOutput'
import { SERVERS, IServer } from '../Constants/servers.const'
import { FRAGMENTS_STRINGS } from './fragments/FRAGMENTS_STRINGS'
import { getDetectedEnv } from '../Shared/getDetectedEnv'
interface ITemplateConnector {
  (): IConnectorOutput
}

const headers: AxiosRequestHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  timestamp: +new Date(),
}

export const templateConnector: ITemplateConnector = () => {
  const envType: string = getDetectedEnv()

  const baseURL = SERVERS[envType as keyof IServer] as string
  const { timeout } = SERVERS

  const obj: IConnectorOutput = {
    testCapture: 'should return 200 code and data defined',
    axiosClient: axios.create({
      baseURL: `${baseURL}/graphql`,
      timeout,
      headers,
    }),
    method: 'post',
    params: {
      operationName: 'SendTemplate',
      variables: {},
      query: `query SendTemplate(){sendTemplate(){} }} fragment ${FRAGMENTS_STRINGS['TemplateGraphqlAll']}`,
    },
  }

  return obj
}
