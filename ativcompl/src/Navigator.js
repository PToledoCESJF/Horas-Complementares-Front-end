import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
// import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createStackNavigator } from 'react-navigation-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Loading from './screens/loading/Loading'
import Auth from './screens/auth/Auth'
import ActivityHome from './screens/activity/ActivityHome'
import ActivityList from './screens/activity/ActivityList'
import ActivityAdd from './screens/activity/ActivityAdd'
import Address from './screens/address/Address'
import Profile from './screens/profile/Profile'
import UserCourse from './screens/userCourse/UserCourse'

import Menu from './screens/menu/Menu'
import commonStyles from './commonStyles'

const Stack = createStackNavigator()

const menuStack = () => {
    return (
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
    )

}
    
const Drawer = createDrawerNavigator()

function menuNavigator(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator /* drawerContent={props => <Menu {...props} />}*/>
                <Drawer.Screen name="ActivitList" component={menuStack} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Address" component={Address} />
                <Drawer.Screen name="UserCourse" component={UserCourse} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}



// const menuConfig = {
//     initialRouteName: 'Activity',
//     contentComponent: Menu,
//     contentOptions: {
//         labelStyle: {
//             fontFamily: commonStyles.fontFamily,
//             fontWeight: 'normal',
//             fontSize: 20
//         },
//         activiteLabelStyle: {
//             color: commonStyles.colors.primary,
//             fontWeight: 'bold'
//         }
//     }
// }

// const myStack = {
//     Activity: {
//         name: 'Activity',
//         screen: props => <ActivityList title='Atividades' {...props} />,
//         navigationOptions: {
//             title: 'Atividades'
//         }
//     },
//     ActivityAdd: {
//         name: 'ActivityAdd',
//         screen: props => <ActivityAdd title='Atividades' {...props} />,
//         navigationOptions: {
//             title: 'Atividades'
//         }
//     },
// }

// const menuStack = createStackNavigator({

// })

// const menuRoutes = {
//     Profile: {
//         name: 'Profile',
//         screen: props => <Profile title='Perfil' {...props} />,
//         navigationOptions: {
//             title: 'Perfil'
//         }
//     },
//     Activity: {
//         name: 'Activity',
//         screen: props => <ActivityList title='Atividades' {...props} />,
//         navigationOptions: {
//             title: 'Atividades'
//         }
//     },
//     ActivityAdd: {
//         name: 'ActivityAdd',
//         screen: props => <menuStack />,
//         navigationOptions: {
//             title: 'Atividades Add'
//         }
//     },
//     Address: {
//         name: 'Address',
//         screen: props => <Address title='Endereço' {...props} />,
//         navigationOptions: {
//             title: 'Endereço'
//         }
//     },
// }


// const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
    Loading: {
        name: 'Loading',
        screen: Loading
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Loading'
})

export default createAppContainer(mainNavigator)
