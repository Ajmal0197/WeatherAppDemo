import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore'
import { Dashboard } from './components/Dashboard';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native'

global.ErrorUtils.setGlobalHandler(function (error) {
    if (error) {
        console.log('error', error)
    }
});

const App = () => {

    useEffect(() => {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('always');
        }
    }, []);

    return (
        <Provider store={store} >
            <Dashboard />
        </Provider>
    )
}

export default App;
