import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import commonStyles from '../../commonStyles'

export default props => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.activ}>{props.name}</Text>
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.textBody}>Carga horária: {props.workload + ""} h</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        borderColor: '#AAA',
        borderWidth: 1,
        paddingVertical: 10,
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
        justifyContent: 'flex-end',
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