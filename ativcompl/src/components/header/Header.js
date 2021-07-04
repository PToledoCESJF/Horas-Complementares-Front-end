import React, { useEffect, useState } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'

import topPage from '../../../assets/imgs/top_page_white.png'
import commonStyles from '../../commonStyles'
import { server, showError } from '../../common'
import Notifications from '../../screens/notification/Notifications'

export default Header = ({ title, toggleFilter, bars, onCancel, isNotification }) => {

    const [notificationCount, setNotificationCount] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)

    useEffect(() => {
        loadCountNotification()
        loadNotifications()
    }, [])


    loadCountNotification = async () => {
        try {
            const res = await axios.get(`${server}/notificationscount`)
            const resCount = res.data

            setNotificationCount(resCount.reduce((a, c) => a + c))
        } catch (e) {
            showError(e)
        }
    }

    loadNotifications = async () => {
        try {
            const res = await axios.get(`${server}/notifications`)
            setNotifications(res.data)
        } catch (e) {
            showError(e)
        }
    }

    return (
        <View>
            <ImageBackground source={topPage}
                style={styles.background}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </ImageBackground>
            <View style={styles.iconBar}>
                {bars
                    && <TouchableOpacity onPress={() => bars()} >
                        <Icon
                            name={'bars'}
                            size={20} color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                    || <TouchableOpacity
                        onPress={() => onCancel()} >
                        <Icon
                            name="arrow-left"
                            size={20} color={commonStyles.colors.secondary} />
                    </TouchableOpacity>
                }
                {/* <TouchableOpacity onPress={() => toggleFilter()} >
                    <Icon
                        name={this.state.showDoneActivity ? 'eye' : 'eye-slash'}
                        size={20} color={commonStyles.colors.secondary}
                    />
                </TouchableOpacity> */}
                {!isNotification
                    && <TouchableOpacity onPress={() => setShowNotifications(true)} >
                        {notificationCount.count > 0
                            &&
                            <View style={styles.done} >
                                <Text style={styles.textNotification}>{notificationCount.count + ''}</Text>
                            </View>
                        }
                        <Icon
                            name={'bell-o'}
                            size={20} color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                }
                <Notifications
                    notifications={notifications}
                    isVisible={showNotifications}
                    onCancel={() => setShowNotifications(false)}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    background: {
        height: 120
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiaryTransparency,
        fontSize: 22,
        fontWeight: 'bold'
    },
    iconBar: {
        backgroundColor: commonStyles.colors.primary,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 5
    },
    done: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -13,
        top: -7
    },
    textNotification: {
        fontSize: 11,
        color: commonStyles.colors.secondary,
        fontWeight: 'bold',
        margin: -10
    }
});