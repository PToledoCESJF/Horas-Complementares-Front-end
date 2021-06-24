import React, { Component } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Platform,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '../../common'
import Activity from '../../components/activity/Activity'
import ActivityAdd from './ActivityAdd'
import topPage from '../../../assets/imgs/top_page_white.png'
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
        let visibleActivities = false
        if (this.state.showDoneActivity) {
            visibleActivities = [...this.state.activities]
        } else {
            const pending = activity => !activity.completed
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

        } catch (e) {
            showError(e)
        }
    }

    deleteActivity = async activityId => {
        try {
            await axios.delete(`${server}/activities/${activityId}`)
            this.loadActivities()
        } catch (e) {
            showError(e)
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={topPage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Atividades</Text>
                    </View>
                </ImageBackground>
                <View style={styles.iconBar}>
                    <TouchableOpacity /* onPress={() => this.props.drawer()} */>
                        <Icon
                            name={'bars'}
                            size={20} color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon
                            name={this.state.showDoneActivity ? 'eye' : 'eye-slash'}
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
                    <FlatList
                        data={this.state.visibleActivities}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ActivityAdd', item)}

                            >
                                <Activity {...item} onToggleActivity={this.toggleActivity} onDelete={this.deleteActivity} />
                            </TouchableOpacity>
                        } />
                </View>
                <TouchableOpacity style={styles.addButton}
                    activeOpacity={0.5}
                    onPress={() => this.props.navigation.navigate('ActivityAdd')}
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
        marginTop: 20
    },
    iconBar: {
        backgroundColor: commonStyles.colors.primary,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 5
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
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
});