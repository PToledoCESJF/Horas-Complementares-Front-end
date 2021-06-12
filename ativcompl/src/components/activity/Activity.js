import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../../commonStyles'

export default props => {

    const formatDate = moment().locale('pt-br').format('ddd, D [de] MMMM')

    const doneOrNotStyle = props.closed != null ?
        { textDecorationLine: 'line-through' } : {}

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleActivity(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.closed)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.name}</Text>
                <Text style={styles.date}>Início: {formatDate}</Text>
                <Text style={styles.hours}>
                    Carga horários: {props.workload + ""}
                    Horas completas: {props.hours_completed + ""}
                </Text>
            </View>
        </View>
    )
}

function getCheckView(closed) {
    if (closed != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#009bd9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 13
    },
    hours: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 13
    }
})