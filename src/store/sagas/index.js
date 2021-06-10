import { all, fork } from 'redux-saga/effects';
import watchDashBoardSaga from './authSaga'

// Redux Saga: Root Saga
export function* rootSaga() {
    yield all([
        fork(watchDashBoardSaga),
    ]);
};