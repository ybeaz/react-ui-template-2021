import axios, { AxiosPromise } from 'axios'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'

import { actionSync, actionAsync } from '../../DataLayer/index.action'
import { templateConnector } from '../../CommunicationLayer/templateConnector'

function* template(dataInput: any) {
  const { data } = dataInput

  const { method, url, payload, options } = templateConnector()

  try {
    yield put(actionSync.TOGGLE_LOADER_OVERLAY(true))
    const {
      data: {
        data: { templateData },
      },
      // @ts-ignore
    } = yield axios[method](url, payload, options)
    yield put(actionAsync.TEMPLATE_ASYNC.SUCCESS(templateData))

    yield put(actionSync.TOGGLE_LOADER_OVERLAY(false))
  } catch (error) {
    console.info('template [23]', error.name + ': ' + error.message)
  }
}

export default function* templateSaga() {
  yield takeEvery([actionAsync.TEMPLATE_ASYNC.REQUEST().type], template)
}
