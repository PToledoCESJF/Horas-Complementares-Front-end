import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Loading from './screens/loading/Loading'
import Auth from './screens/auth/Auth'
import ActivityList from './screens/activity/ActivityList'
import Address from './screens/address/Address'
import Profile from './screens/profile/Profile'
import ProfileCS from './screens/profile/ProfileCS'

import Menu from './screens/menu/Menu'
import commonStyles from './commonStyles'

const menuConfig = {
    initialRouteName: 'Activity',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activiteLabelStyle: {
            color: commonStyles.colors.primary,
            fontWeight: 'bold'
        }
    }
}

const menuRoutes = {
    Profile: {
        name: 'Profile',
        screen: props => <Profile title='Perfil' {...props} />,
        navigationOptions: {
            title: 'Perfil'
        }
    },
    Activity: {
        name: 'Activity',
        screen: props => <ActivityList title='Atividades' {...props} />,
        navigationOptions: {
            title: 'Atividades'
        }
    },
    Address: {
        name: 'Address',
        screen: props => <Address title='Endereço' {...props} />,
        navigationOptions: {
            title: 'Endereço'
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)


const menuRoutesCS = {
    Profile: {
        name: 'Profile',
        screen: props => <ProfileCS title='Perfil' {...props} />,
        navigationOptions: {
            title: 'Cadastro'
        }
    },
    Activity: {
        name: 'Activity',
        screen: props => <ActivityList title='Atividades' {...props} />,
        navigationOptions: {
            title: 'Atividades do cara'
        }
    },
    Address: {
        name: 'Address',
        screen: props => <Address title='Endereço' {...props} />,
        navigationOptions: {
            title: 'Endereço do broww'
        }
    },
}

const menuNavigatorCS = createDrawerNavigator(menuRoutesCS, menuConfig)

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
    },
    HomeCS: {
        name: 'HomeCS',
        screen: menuNavigatorCS
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Loading'
})

export default createAppContainer(mainNavigator)
