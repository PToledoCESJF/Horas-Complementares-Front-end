import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native'
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

        this.setState({ userData })

        if (userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`

            if (userData.usertypeId == 1) {
                if(userData.userCourse != null){
                    this.props.navigation.navigate('Home', userData)
                } else {
                    this.props.navigation.navigate('HomeFA', userData)
                    Alert.alert('Atenção', 'Você precisa iniciar um curso para registrar atividades')
                }
            } else {
                this.props.navigation.navigate('HomeCS', userData)
            }
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={commonStyles.colors.secondary} />
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
