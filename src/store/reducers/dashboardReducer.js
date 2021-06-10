import { types } from '../ActionTypes';

const INITIAL_STATE = {
    loader: false,
    arrayOfWeather: null,
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.TOGGLE_LOADING: {
            return { ...state, loader: payload }
        }
        case types.STORE_TO_REDUCER: {
            return { ...state, arrayOfWeather: payload, loader: false }
        }
        default: return state
    }
}