import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import commonStyles from '../../commonStyles'

export default props => {

    const [workloadValidated] = useState(props.workloadValidated ? props.workloadValidated : 0)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.activ}>{props.name}</Text>
                <Text style={styles.activ}>{props.course}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textBody}>validadas</Text>
                 <Text style={styles.textBody}>{workloadValidated + ""} h</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: commonStyles.colors.secondary
    },
    header: {
        width: '60%',
        alignItems: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 10
    },
    activ: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        fontSize: 16,
        // fontWeight: ''
    },
    body: {
        alignItems: 'flex-end',
        marginHorizontal: 15
    },
    textBody: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontWeight: 'bold',
        fontSize: 13
    },
})