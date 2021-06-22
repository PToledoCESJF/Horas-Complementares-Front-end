import React from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import commonStyles from '../../commonStyles'

export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('Loading')
    }

    return (
        <ScrollView>
            <Text style={styles.title}>Atividades Complementares</Text>
            <View style={styles.header}>
                <Gravatar style={styles.avatar}
                    options={{
                        registration: props.navigation.getParam('registration'),
                        secure: true
                    }}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.navigation.getParam('name')}
                    </Text>
                    <Text style={styles.email}>
                        {props.navigation.getParam('email')}
                    </Text>
                </View>
            </View>
            <DrawerItems {...props} />
            <View style={styles.logoutIcon}>
                <TouchableOpacity onPress={logout}>
                    <Icon name='sign-out' size={25} color='#800' />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: commonStyles.colors.primaryTransparency,
        backgroundColor: commonStyles.colors.primaryTransparency,
    },
    title: {
        color: commonStyles.colors.tertiary,
        fontFamily: commonStyles.fontFamily,
        fontSize: 24,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
    },
    userInfo: {
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
    },
    registration: {
        fontSize: 15,
        marginBottom: 5,
        color: commonStyles.colors.subText
    },
    name: {
        fontSize: 20,
        color: commonStyles.colors.mainText,
        marginBottom: 5,
    },
    email: {
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 10,
    },
    logoutIcon: {
        justifyContent: 'flex-end',
        marginLeft: 15,
        marginTop: 60,
    }
})