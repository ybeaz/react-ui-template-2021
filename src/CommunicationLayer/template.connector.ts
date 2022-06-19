import { print } from 'graphql'

import { CLIENT, EClient } from './communicationClients/index.clients'
import { IConnectorOutput } from '../Interfaces/IConnectorOutput'
import { GetRecipeDocument } from '../types/graphql'

interface ITemplateConnector {
  (variables: any): IConnectorOutput
}

export const templateConnector: ITemplateConnector = variables => {
  const obj: IConnectorOutput = {
    client: CLIENT[EClient.CLIENT_AXIOS],
    method: 'post',
    params: {
      operationName: 'GetRecipe',
      variables,
      query: print(GetRecipeDocument),
      // query: `query SendTemplate(){sendTemplate(){} }} fragment ${FRAGMENTS_STRINGS['TemplateGraphqlAll']}`,
    },
  }

  return obj
}
