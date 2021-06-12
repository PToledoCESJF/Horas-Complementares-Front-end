import React, { Component } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Activity from './components/activity/Activity'
import ActivityAdd from './screens/activity/ActivityAdd'
import topPage from '../assets/imgs/top_page.png'
import commonStyles from './commonStyles'

const initialState = {
    showActivityAdd: false,
    showDoneActivity: true,
    visibleActivities: [],
    activities: []
}
export default class App extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString =  await AsyncStorage.getItem('activityState')
        const state = JSON.parse(stateString || initialState)
        this.setState(state, this.filterActivities)
    }

    toggleFilter = () => {
        this.setState({ showDoneActivity: !this.state.showDoneActivity }, this.filterActivities)
    }

    filterActivities = () => {
        let visibleActivities = null
        if (this.state.showDoneActivity) {
            visibleActivities = [...this.state.activities]
        } else {
            const pending = activity => activity.closed === null
            visibleActivities = this.state.activities.filter(pending)
        }
        this.setState({ visibleActivities })
        AsyncStorage.setItem('activityState', JSON.stringify(this.state))
    }

    toggleActivity = activityId => {
        const activities = [...this.state.activities]
        activities.forEach(activity => {
            if (activity.id === activityId) {
                activity.closed = activity.closed ? null : true
            }
        })
        this.setState({ activities }, this.filterActivities)
    }

    addActivity = newActivity => {
        if (!newActivity.name || !newActivity.name.trim()) {
            Alert.alert('Dados Inválidos', 'Nome da Atividade não informado.')
            return
        }

        const activities = [...this.state.activities]
        activities.push({
            id: Math.random(),
            name: newActivity.name,
            start: newActivity.start,
            workload: 15,
            hours_completed: 9,
            closed: null
        })

        this.setState({ activities, showActivityAdd: false }, this.filterActivities)
    }

    deleteActivity = id => {
        const activities = this.state.activities.filter(activity => activity.id !== id)
        this.setState({ activities }, this.filterActivities)
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <ActivityAdd
                    isVisible={this.state.showActivityAdd}
                    onCancel={() => this.setState({ showActivityAdd: false })}
                    onSave={this.addActivity}
                />
                <ImageBackground source={topPage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon
                                name={this.state.showDoneActivity ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.primary}
                            />
                        </TouchableOpacity>

                    </View>

                </ImageBackground>
                <View style={styles.app}>
                    <FlatList
                        data={this.state.visibleActivities}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Activity {...item} onToggleActivity={this.toggleActivity} onDelete={this.deleteActivity} />}
                    />
                </View>
                <TouchableOpacity style={styles.addButton}
                    activeOpacity={0.5}
                    onPress={() => this.setState({ showActivityAdd: true })}
                >
                    <Icon name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 2
    },
    app: {
        flex: 8,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#009bd9',
        justifyContent: 'center',
        alignItems: 'center'
    }
});