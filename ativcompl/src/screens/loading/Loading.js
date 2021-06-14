import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import commonStyles from '../../commonStyles';

export default class Loading extends Component {

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (e) {
            // userData está inválido
        }

        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        } else {
            this.props.navigation.navigate('Auth')

        }
    }

    render() {

        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.colors.primaryTransparency,
    }
})
