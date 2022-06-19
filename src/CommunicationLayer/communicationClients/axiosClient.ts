import axios, { AxiosRequestHeaders } from 'axios'

import { getDetectedEnv } from '../../Shared/getDetectedEnv'
import { SERVERS, IServer } from '../../Constants/servers.const'

const headers: AxiosRequestHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  timestamp: +new Date(),
}

const envType: string = getDetectedEnv()

const baseURL = SERVERS[envType as keyof IServer] as string
const { timeout } = SERVERS

export const axiosClient = axios.create({
  baseURL: `${baseURL}/graphql`,
  timeout,
  headers,
})
