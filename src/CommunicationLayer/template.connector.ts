import { print } from 'graphql'

import { axiosClient } from './clients/axiosClient'
import { IConnectorOutput } from '../Interfaces/IConnectorOutput'
import { GetRecipeDocument } from '../types/graphql'

interface ITemplateConnector {
  (variables: any): IConnectorOutput
}

export const templateConnectorAxios: ITemplateConnector = variables => {
  const obj: IConnectorOutput = {
    client: axiosClient,
    params: {
      operationName: 'GetRecipe',
      variables,
      query: print(GetRecipeDocument),
      // query: `query SendTemplate(){sendTemplate(){} }} fragment ${FRAGMENTS_STRINGS['TemplateGraphqlAll']}`,
    },
  }

  return obj
}
