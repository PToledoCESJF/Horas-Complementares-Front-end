import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../../commonStyles'

export default props => {

    const formatDate = moment(props.start).locale('pt-br').format('ddd, D [de] MMMM')

    const doneOrNotStyle = props.closed != null ?
        { textDecorationLine: 'line-through' } : {}

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={25} color="#FFF" />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="check" size={25} color="#FFF" style={styles.closeIcon} />
                <Text style={styles.closeActivity}>Concluir</Text>
            </View>
        )
    }

    return (
        <Swipeable
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>

            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleActivity(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.closed)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.activ, doneOrNotStyle]}>{props.name}</Text>
                    <Text style={styles.date}>Início: {formatDate}</Text>
                    <Text style={styles.hours}>Carga horários: {props.workload + ""}</Text>
                    <Text style={styles.hours}>Horas completas: {props.hoursCompleted + ""}</Text>
                </View>
            </View>
        </Swipeable>
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
        paddingVertical: 10,
        backgroundColor: '#FFF'
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
    activ: {
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
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: '#009bd9',
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeActivity: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 18,
        margin: 10
    },
    closeIcon: {
        marginLeft: 10
    }
})