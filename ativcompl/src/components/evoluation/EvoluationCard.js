import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import commonStyles from '../../commonStyles'

export default props => {

    const [showButtom] = useState(props.workloadValidated >= props.workload ? true : false)

    const send = (data) => {
        const newSend = {
            course: {
                id: data.id,
                name: data.name,
                workload: data.workload
            },
            activities: data.activities,
            totalWorkload: data.workloadValidated
        }

        props.onSend && props.onSend(newSend)
    }

    return (
        <View style={styles.container}>
            {
                props.name &&
                <View>
                    <View style={styles.body}>
                        <Text style={styles.activ}><Text style={{ fontWeight: 'bold' }}>Curso: </Text>{props.name}</Text>
                        <Text style={styles.activ}><Text style={{ fontWeight: 'bold' }}>Carga horária: </Text>{props.workload} horas</Text>
                        <Text style={styles.activ}><Text style={{ fontWeight: 'bold' }}>Horas concluídas: </Text>{props.workloadValidated} horas</Text>
                    </View>
                    {showButtom
                        && <View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => send(props)}
                            >
                                <View style={styles.buttons} >
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Enviar Atividades</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: commonStyles.colors.secondary
    },
    body: {
        alignItems: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 10
    },
    activ: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
        margin: 15,
        borderRadius: 10
    },
    button: {
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 16
    },
})