import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Auth from './screens/auth/Auth'
import ActivityList from './screens/activity/ActivityList'

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Activity: {
        name: 'Activity',
        screen: ActivityList
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)
