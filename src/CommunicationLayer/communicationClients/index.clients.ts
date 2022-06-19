import { axiosClient } from './axiosClient'
import { apolloClient } from './apolloClient'

export enum EClient {
  CLIENT_AXIOS,
  CLIENT_APOLLO,
}

export const CLIENT: Record<EClient, any> = {
  [EClient.CLIENT_AXIOS]: axiosClient,
  [EClient.CLIENT_APOLLO]: apolloClient,
}
