import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text, View, FlatList, Button } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { types } from '../../store/ActionTypes'
import LottieView from 'lottie-react-native';

const Dashboard = () => {

    const [location, setLocation] = useState(null);
    const dispatch = useDispatch();
    const { loader, arrayOfWeather } = useSelector(state => ({
        loader: state.dashboardReducer.loader,
        arrayOfWeather: state.dashboardReducer.arrayOfWeather,
    }), shallowEqual);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude,
                    longitude,
                });
                console.log('position.coords', position.coords);
            },
            error => {
                setLocation(null)
                console.log(error.code, error.message);
                Linking.openSettings();
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }, []);

    useEffect(() => {
        storeDataFunc()
    }, [location])

    const storeDataFunc = () => {
        if (location) {
            dispatch({
                type: types.GET_WHETHER_DATA_SAGA,
                payload: location
            })
        }
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.cardView}>
            <Text style={[styles.textDate, { fontSize: 15 }]}>{item.dt_txt}</Text>
            <Text style={styles.textDate}>{item.main.temp}</Text>
        </View>
    )

    return (
        <View style={{ flex: 1, justifyContent: 'center', }}>
            {loader && <LottieView
                style={{ position: 'absolute', zIndex: 1 }}
                autoPlay
                source={require('../../assets/lottieFiles/loader.json')}
            />}
            {arrayOfWeather.length > 0 ? <View style={{ flex: 0.3, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textDate}>{arrayOfWeather[0].dt_txt.substr(0, arrayOfWeather[0].dt_txt.indexOf(' '))}</Text>
                <Text>to</Text>
                <Text style={styles.textDate}>{arrayOfWeather[arrayOfWeather.length - 1].dt_txt.substr(0, arrayOfWeather[0].dt_txt.indexOf(' '))}</Text>

            </View> : null}
            <View style={{ flex: 0.7, }}>
                <FlatList
                    data={arrayOfWeather}
                    renderItem={renderItem}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.textDate, marginBottom: 30 }}>Something went wrong</Text>
                            <Button
                                title="Try Again"
                                onPress={storeDataFunc}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
                    keyExtractor={(item, index) => index + ''}
                />
            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    cardView: { borderWidth: 1, borderColor: 'red', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    textDate: { fontSize: 30 },
})
