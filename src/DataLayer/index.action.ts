import { createSyncActions, CreateSyncAction } from './createActionsSync'
import { createAsyncAction, CreateAsyncAction } from './createActionsAsync'

/** @description  Synchroneours redux actions */
const ACTIONS_SYNC: string[] = [
  // 'SET_THEME',
  'SET_MODAL_FRAMES',
  'TOGGLE_LOADER_OVERLAY',
  'TEMPLATE',
]

/** @description Asynchroneous actions for saga */
const ACTION_ASYNC: string[] = ['TEMPLATE_ASYNC']

export const actionSync: CreateSyncAction = createSyncActions(ACTIONS_SYNC)
export const actionAsync: CreateAsyncAction = createAsyncAction(ACTION_ASYNC)

// Example of the sync action
// export const TEST_ACTION: Function = (data: any = true): IAction => ({
//   type: 'TEST_ACTION',
//   data,
// })
