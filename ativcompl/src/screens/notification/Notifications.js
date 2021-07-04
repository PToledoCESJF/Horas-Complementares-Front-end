import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Modal,
} from 'react-native'
import axios from 'axios'

import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'
import NotificationCard from '../../components/notification/NotificationCard'

export default class Notifications extends Component {

    updateRead = async (notificationId) => {
        try {
            await axios.put(`${server}/notifications/${notificationId}/read`)

        } catch (e) {
            showError(e)
        }
    }

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide"
            >
                <Header
                    title='Notificações'
                    onCancel={this.props.onCancel}
                    isNotification={true}
                />
                <SafeAreaView style={styles.container}>

                    <View style={styles.app}>
                        <FlatList
                            data={this.props.notifications}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) =>
                                <NotificationCard {...item} onSave={this.updateRead} />
                            } />
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.secondary,
    },
    app: {
        flex: 8,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#AAA',
    },
});