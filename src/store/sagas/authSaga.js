import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { types } from '../ActionTypes';
import { create } from 'apisauce'

// define the api
const api = create({
    baseURL: 'https://api.openweathermap.org',
})

function* getWeatherData({ payload }) {
    try {
        yield put({
            type: types.TOGGLE_LOADING,
            payload: true
        })

        const result = yield call(api.get, `/data/2.5/forecast?lat=${payload.latitude}&lon=${payload.longitude}&appid=6f934626da44077278b1dd23a1a4dfff`)

        console.log('getWeatherData111', result)

        yield put({
            type: types.STORE_TO_REDUCER,
            payload: result.data.list
        })

    } catch (error) {
        console.log(error);
    }
}


export default function* watchDashBoardSaga() {
    yield takeLatest(types.GET_WHETHER_DATA_SAGA, getWeatherData);
}