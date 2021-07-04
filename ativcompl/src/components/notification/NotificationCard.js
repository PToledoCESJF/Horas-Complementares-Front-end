import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import commonStyles from '../../commonStyles'

export default props => {

    const [read, setRead] = useState(props.read ? props.read : false)

    const getSave = () => {
        
        props.onSave && props.onSave(props.id)
        setRead(!read)

    }

    return (
        <View >
            {!read
                ? <TouchableOpacity style={styles.container}
                    onPress={() => getSave()}
                >
                    <View style={styles.card}>
                        <Text>
                            <Text style={styles.textBold}>{props.user}</Text> Classificou a atividade: <Text style={styles.textBold}>{props.activity}</Text> como {props.message}
                        </Text>
                    </View>
                </TouchableOpacity>
                : <View style={styles.containerReaded}>
                    <View style={styles.card}>
                        <Text>
                            <Text style={styles.textBold}>{props.user}</Text> Classificou a atividade: <Text style={styles.textBold}>{props.activity}</Text> como {props.message}
                        </Text>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: 'rgba(0, 155, 217, 1)',
        borderWidth: 0.8,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 155, 217, 0.25)'
    },
    containerReaded: {
        width: '100%',
        borderColor: 'rgba(0, 155, 217, 1)',
        borderWidth: 0.8,
        paddingVertical: 10,
        backgroundColor: commonStyles.colors.secondary
    },
    card: {
        width: '90%',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginBottom: 10
    },
    textBold: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        fontSize: 15,
        fontWeight: 'bold'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 15
    },
    textBody: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        marginTop: 7,
        fontSize: 13
    },

})