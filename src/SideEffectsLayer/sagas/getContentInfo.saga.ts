import axios from 'axios'
import { takeEvery, put, select } from 'redux-saga/effects'

import { getCoursesValidated } from '../../Shared/getCoursesValidated'
import { getOptionsShuffled } from '../../Shared/getOptionsShuffled'
import { getProdidevAnswerDefault } from '../../Shared/getProdidevAnswerDefault'
import { getProvidedActiveDefault } from '../../Shared/getProvidedActiveDefault'
import { getProvidedID } from '../../Shared/getProvidedID'
import * as action from '../../DataLayer/index.action'
import { getContentInfoConnector } from '../../ComminicationLayer/getContentInfo.connector'

function* getContentInfo() {
  try {
    const { method, url, options } = getContentInfoConnector()
    const {
      data: { courses },
    } = yield axios[method](url, {}, options)
    // console.info('getContentInfo.saga [17]', { courses })
    let coursesNext = getCoursesValidated(courses)
    coursesNext = getProvidedID(coursesNext)
    coursesNext = getOptionsShuffled(coursesNext)
    coursesNext = getProvidedActiveDefault(coursesNext)
    coursesNext = getProdidevAnswerDefault(coursesNext)
    // console.info('getContentInfo.saga [22]', { coursesNext, courses })
    yield put({ type: action.GET_CONTENT_DATA.SUCCESS, data: coursesNext })
  } catch (error) {
    console.info('getContentInfo  [20]', error.name + ': ' + error.message)
  }
}

export default function* getContentInfoWatcher() {
  yield takeEvery([action.GET_CONTENT_DATA.REQUEST], getContentInfo)
}