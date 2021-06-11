import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'


import Activity from '../../components/Activity'
import commonStyles from '../../commonStyles';

import topImage from '../../../assets/imgs/topImage.png'

export default class Home extends Component {
    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={topImage}
                    style={styles.background}>

                </ImageBackground>
                <View style={styles.Home}>
                    <Text>Atividades Complementares</Text>
                    <Activity props={activities} />
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    Home: {
        flex: 7
    }
})
