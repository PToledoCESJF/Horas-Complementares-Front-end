import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import ActivityList from './ActivityList'
import ActivityAdd from './ActivityAdd'

const Stack = createStackNavigator()

export default (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='ActivityList'
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name='ActivityList'>
                        {props => (
                            <ActivityList {...props} />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name='ActivityAdd'>
                        {props => (
                            <ActivityAdd {...props} />
                        )}
                    </Stack.Screen>

                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}
