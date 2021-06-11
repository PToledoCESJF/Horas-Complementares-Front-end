import React, { useContext } from 'react'
import { View, FlatList, Alert, Text } from 'react-native'
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import ActivityContext from '../../context/ActivityContext'

const ativit_compl = "https://cdn.pixabay.com/photo/2020/10/16/18/49/boy-5660437_960_720.png"

export default props => {

    const { state, dispatch } = useContext(ActivityContext)

    const confirmActivityDelection = (activity) => {
        Alert.alert('Excluir Atividade', 'Deseja excluir a atividade?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteActivity',
                        payload: activity,
                    })
                }
            }, {
                text: 'Não'
            }
        ])
    }

    const getActivityItem = ({ item: activity }) => {
        return (
            <ListItem key={activity.id}
                bottomDivider
                onPress={() => props.navigation.navigate('ActivityForm', activity)}
            >
                <Avatar source={{ uri: ativit_compl }} />
                <ListItem.Content>
                    <ListItem.Title>{activity.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        <Text>Carga Horária: {activity.workload.toString()}h</Text>
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                        <Text>Horas completas: {activity.hoursCompleted}h</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => confirmActivityDelection(activity)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={activity => activity.id.toString()}
                data={state.activities}
                renderItem={getActivityItem}
            />
        </View>
    )
}
