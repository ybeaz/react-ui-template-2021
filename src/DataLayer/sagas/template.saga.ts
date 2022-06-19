import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'

import { actionSync, actionAsync } from '../../DataLayer/index.action'
import { templateConnector } from '../../CommunicationLayer/template.connector'

function* template(input: any) {
  const { data: variables } = input

  const { client, method, params } = templateConnector(variables)
  console.info('template.saga [8]', {
    variables,
    client,
    method,
    params,
  })

  try {
    yield put(actionSync.TOGGLE_LOADER_OVERLAY(true))
    const {
      data: { data },
      // @ts-ignore
    } = yield client[method]('', params)

    console.info('template.saga [21]', { data })
    yield put(actionAsync.TEMPLATE_ASYNC.SUCCESS(data))

    yield put(actionSync.TOGGLE_LOADER_OVERLAY(false))
  } catch (error) {
    const err: any = error
    console.info('template [40]', err.name + ': ' + err.message)
  }
}

export default function* templateSaga() {
  yield takeEvery([actionAsync.TEMPLATE_ASYNC.REQUEST().type], template)
}
