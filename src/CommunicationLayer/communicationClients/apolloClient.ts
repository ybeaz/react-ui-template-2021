import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  DefaultOptions,
} from '@apollo/client'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  timestamp: +new Date(),
}

import { getDetectedEnv } from '../../Shared/getDetectedEnv'
import { SERVERS, IServer } from '../../Constants/servers.const'

const envType: string = getDetectedEnv()

const baseURL = SERVERS[envType as keyof IServer] as string

const createHttpLink = (): HttpLink => {
  return new HttpLink({
    uri: `${baseURL}/graphql`,
    headers,
  })
}

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = createHttpLink()

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions,
  })
}

export const apolloClient = createApolloClient()
