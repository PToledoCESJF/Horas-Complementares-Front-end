import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Icon } from 'react-native-elements'
import ActivityList from './activity/ActivityList'
import ActivityForm from './activity/ActivityForm'
import { ActivityProvider } from '../context/ActivityContext'

const Stack = createStackNavigator()

export default props => {
    return (
        <ActivityProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="ActivityList"
                    screenOptions={screenOptions}>
                    <Stack.Screen
                        name="ActivityList"
                        component={ActivityList}
                        options={({ navigation }) => {
                            return {
                                title: "Lista de Atividades",
                                headerRight: () => (
                                    <Button
                                        onPress={() => navigation.navigate("ActivityForm")}
                                        type="clear"
                                        icon={<Icon name="add" size={25} color="white" />}
                                    />
                                )
                            }
                        }}
                    />
                    <Stack.Screen
                        name="ActivityForm"
                        component={ActivityForm}
                        options={{
                            title: "Fomulário de Atividades"
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ActivityProvider>

    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}
