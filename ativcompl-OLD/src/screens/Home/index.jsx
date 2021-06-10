import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import topImage from '../../../assets/imgs/topImage.png'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={topImage}
                    style={styles.background}>

                </ImageBackground>
                <View style={styles.Home}>
                    <Text>Atividades Complementares</Text>
                </View>
            </View>
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
