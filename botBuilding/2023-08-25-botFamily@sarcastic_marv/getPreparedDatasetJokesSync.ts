import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { ChatMessagesType } from '../@types/ChatMessagesType'
import { RoleType } from '../@types/RoleType'

export type JokeObjectType = { id: string; joke: string }

export type GetPreparedDatasetJokesSyncParamsType = {
  dataset: JokeObjectType[]
}

export type GetPreparedDatasetJokesSyncResType = ChatMessagesType[]

interface GetPreparedDatasetJokesSyncType {
  (
    params: GetPreparedDatasetJokesSyncParamsType,
    options?: { printRes: boolean }
  ): GetPreparedDatasetJokesSyncResType
}

/**
 * @description Function to getPreparedDatasetJokesSync
 * @import import { getPreparedDatasetJokesSync } from './getPreparedDatasetJokesSync'
 */

export const getPreparedDatasetJokesSync: GetPreparedDatasetJokesSyncType = (
  params,
  options
) => {
  const { dataset } = params

  try {
    const res: ChatMessagesType[] = dataset
      .filter((jokeObject: JokeObjectType) => {
        const jokeArr = jokeObject?.joke?.match(/[a-zA-Z]/g)
        let jokeArrLen = 0
        if (Array.isArray(jokeArr)) jokeArrLen = jokeArr.length

        return jokeArrLen > 40 && jokeArrLen < 90
      })
      .filter((_: JokeObjectType, index: number) => index < 6000)
      .map((jokeObject: JokeObjectType) => {
        const { joke } = jokeObject
        return {
          messages: [
            {
              role: RoleType['system'],
              content:
                'You are a sarcastic assistant that answers questions with a relevant sarcastic comment or joke.',
            },
            {
              role: RoleType['user'],
              content: '<user question...>',
            },
            {
              role: RoleType['assistant'],
              content: `<assistant answer ...> ${joke}.`,
            },
          ],
        }
      })

    if (options?.printRes) {
      consoler(
        'getPreparedDatasetJokesSync',
        'getPreparedDatasetJokesSyncRes',
        res
      )
    }

    return res
  } catch (error) {
    consolerError('getPreparedDatasetJokesSync', error)
    return []
  }
}
