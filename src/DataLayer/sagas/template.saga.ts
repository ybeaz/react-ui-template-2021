import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'

import { actionSync, actionAsync } from '../../DataLayer/index.action'
import { templateConnector } from '../../CommunicationLayer/template.connector'

function* template(dataInput: any) {
  const { data } = dataInput

  const { axiosClient, method, params } = templateConnector()

  try {
    yield put(actionSync.TOGGLE_LOADER_OVERLAY(true))
    const {
      data: {
        data: { templateData },
      },
      // @ts-ignore
    } = yield axiosClient[method]('', params)

    yield put(actionAsync.ACT_TEMPLATE.SUCCESS(templateData))

    yield put(actionSync.TOGGLE_LOADER_OVERLAY(false))
  } catch (error) {
    const err: any = error
    console.info('template [40]', err.name + ': ' + err.message)
  }
}

export default function* templateSaga() {
  yield takeEvery([actionAsync.TEMPLATE_ASYNC.REQUEST().type], template)
}
