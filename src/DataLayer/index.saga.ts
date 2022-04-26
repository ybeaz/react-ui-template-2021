import { all, fork } from 'redux-saga/effects'

import templateSaga from './sagas/template.saga'

export default function* indexSaga() {
  yield all([fork(templateSaga)])
}
