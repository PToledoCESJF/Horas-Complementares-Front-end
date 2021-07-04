import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Platform,
    Modal,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../../commonStyles'
import ActivityByStudents from '../../components/activity/ActivityByStudents'

export default class ActivitiesUsers extends Component {

    clearModal = () => {
        this.setState({
            activityId: '',
        })
        this.props.onCancel()
    }

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={() => this.clearModal()}
                animationType="slide">
                    <SafeAreaView style={styles.container}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity
                                onPress={() => this.clearModal()} >
                                <Icon
                                    name={'arrow-left'}
                                    size={20} color={commonStyles.colors.secondary}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity /* onPress={this.toggleFilter} */>
                                <Icon
                                    name={'bell-o'}
                                    size={20} color={commonStyles.colors.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.app}>
                            <View style={styles.titleBar}>
                                <Text style={styles.title}>{this.props.student.name}</Text>
                                <Text style={styles.subTitle}>{this.props.student.course}</Text>
                            </View>
                            <FlatList
                                data={this.props.activities[0]}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                    onPress={() => this.props.onActivity(item.id)}
                                    >
                                        <ActivityByStudents {...item} />
                                    </TouchableOpacity>
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
        marginTop: 120

    },
    background: {
        flex: 2
    },
    app: {
        flex: 8,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#AAA',
    },
    iconBar: {
        backgroundColor: commonStyles.colors.primary,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 5
    },
    titleBar: {
        marginLeft: 15,
        marginVertical: 10
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        fontSize: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        fontSize: 16,
    },
});