import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import ActivityContext from '../../context/ActivityContext'


export default ({ route, navigation }) => {
    const [activity, setActivity] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(ActivityContext)

    return (
        <View style={style.form}>
            <Text>Nome</Text>
            <TextInput
                style={style.input}
                onChangeText={name => setActivity({ ...activity, name })}
                placeholder="Nome"
                value={activity.name}
            />
            <Text>Início</Text>
            <TextInput
                style={style.input}
                onChangeText={start => setActivity({ ...activity, start })}
                placeholder="Início"
                value={activity.start}
            />
            <Text>Carga Horária</Text>
            <TextInput
                style={style.input}
                onChangeText={workload => setActivity({ ...activity, workload })}
                placeholder="Carga horária"
                value={activity.id ? activity.workload.toString() : activity.workload}
            />
            <Text>Horas Completas</Text>
            <TextInput
                style={style.input}
                onChangeText={hoursCompleted => setActivity({ ...activity, hoursCompleted })}
                placeholder="Horas Completas"
                value={activity.id ? activity.hoursCompleted.toString() : activity.hoursCompleted}
            />
            <Button
                title="Salvar"
                onPress={() => {
                    dispatch({
                        type: activity.id ? 'updateactivity' : 'createactivity',
                        payload: activity
                    })
                    navigation.goBack()
                }}
            />
        </View>
    )
}


const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
})

