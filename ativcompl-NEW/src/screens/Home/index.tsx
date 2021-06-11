import React from 'react'
import { View, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import Activity from '../../components/Activity'
import commonStyles from '../../commonStyles';
const activities = require('../../util/data/db_fake.json')


const Home: React.FC = () => {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../../assets/imgs/topImage.png")}
                style={styles.background}>
            </ImageBackground>
            <View style={styles.home}>
               <Activity props={activities} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    home: {
        flex: 7
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        marginLeft: 20
    }
})

export default Home;