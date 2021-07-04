import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import commonStyles from '../../commonStyles'

export default props => {

    function getCheckView(completed) {
        if (completed) {
            return (
                <View style={styles.done}>
                    <Icon name='check' size={18} color='#FFF'></Icon>
                </View>
            )
        } else {
            return (
                <View style={styles.pending}></View>
            )
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.activ}>{props.name}</Text>
            </View>
            <View style={styles.body}>
                <TouchableWithoutFeedback onPress={() => props.onToggleActivity(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.completed)}
                        <Text style={styles.textBody}>Concluído</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={styles.textBody}>Carga horária: {props.workload + ""} h</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        borderColor: '#AAA',
        borderWidth: 3,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: commonStyles.colors.secondary
    },
    checkContainer: {
        width: '27%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        width: '90%',
        alignItems: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 10
    },
    activ: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.primary,
        fontSize: 18,
        fontWeight: 'bold'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    pending: {
        height: 22,
        width: 22,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 22,
        width: 22,
        borderRadius: 13,
        backgroundColor: '#009bd9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBody: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontWeight: 'bold',
        fontSize: 13
    },
    right: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 20
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