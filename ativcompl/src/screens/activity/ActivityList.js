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
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '../../common'
import Activity from '../../components/activity/Activity'
import ActivityAdd from './ActivityAdd'
import topPage from '../../../assets/imgs/top_page.png'
import commonStyles from '../../commonStyles'

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
        const stateString = await AsyncStorage.getItem('activityState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneActivity: savedState.showDoneActivity
        }, this.filterActivities)
        this.loadActivities()
    }

    // TODO >> converter essa funcionalidade para outros fins
    loadActivities = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-10 23:59:59')
            const res = await axios.get(`${server}/activities?start=${maxDate}`)
            this.setState({ activities: res.data }, this.filterActivities)
        } catch (e) {
            showError(e)
        }
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
        AsyncStorage.setItem('activityState', JSON.stringify({
            showDoneActivity: this.state.showDoneActivity
        }))
    }

    toggleActivity = async activityId => {
        try {
            await axios.put(`${server}/activities/${activityId}/toggle`)
            this.loadActivities()
        } catch(e) {
            showError(e)
        }
    }

    addActivity = async newActivity => {
        if (!newActivity.name || !newActivity.name.trim()) {
            Alert.alert('Dados Inválidos', 'Nome da Atividade não informado.')
            return
        }

        try {
            await axios.post(`${server}/activities`, {
                name: newActivity.name,
                start: newActivity.start,
                workload: newActivity.workload,
                hoursCompleted: newActivity.hoursCompleted,
                closed: null
            })

            this.setState({ showActivityAdd: false }, this.loadActivities)

        } catch (e) {
            showError(e)
        }
    }

    deleteActivity = async activityId => {
        try {
            await axios.delete(`${server}/activities/${activityId}`)
            this.loadActivities()
        } catch(e) {
            showError(e)
        }
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