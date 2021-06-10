import { combineReducers } from 'redux';
import dashboardReducer from './dashboardReducer';
import { types } from '../ActionTypes';

const appReducer = combineReducers({
    dashboardReducer,
});
const rootReducer = (state, action) => {
    if (action.type === types.DESTROY_SESSION)
        state = undefined;

    return appReducer(state, action);
}

export default rootReducer;
