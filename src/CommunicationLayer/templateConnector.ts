import { IConnector } from '../Interfaces/IConnector'

import { IHeaders, IConnectorOutput } from '../Interfaces/IConnectorOutput'

const headers: IHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  timestamp: +new Date(),
}

export const templateConnector: IConnector = () => {
  const obj: IConnectorOutput = {
    testCapture: 'should return 200 code and data defined',
    method: 'post',
    payload: {
      operationName: 'SendTemplate',
      variables: {},
      query: `query SendTemplate(){sendTemplate(){} }} fragment ${`...`}`,
    },
    options: { headers: { ...headers } },
    url: `.../graphql`,
  }

  return obj
}
