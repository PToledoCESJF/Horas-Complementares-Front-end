import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import { server, showError } from '../../common'
import Header from '../../components/header/Header'
import commonStyles from '../../commonStyles'

import Students from '../../components/valuation/Students'

import ActivitiesUsers from './ActivitiesUsers'
import ValuationsAdd from './ValuationsAdd'

const initialState = {
    students: [],
    workloadValidated: '',
    student: '',
    activityId: 0,
    showActivitiesUsers: false,
    showActivityUser: false,
    activities: [],
    loading: false,
    activity: {
        id: '',
        name: '',
        certificate: '',
        start: '',
        end: '',
        workload: '',
    },
    workloadValidated: 20,

}
export default class Valuations extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {

        this.loadStudents()
        this.loadWorkloadValidated()
    }

    loadStudents = async () => {
        try {
            const res = await axios.get(`${server}/profileusertype`)
            this.setState({ students: res.data }, /* this.filterActivities */)
        } catch (e) {
            showError(e)
        }
    }

    loadWorkloadValidated = async () => {
        try {
            const res = await axios.get(`${server}/activities?userId=${this.state.students.userId}&courseId=${this.state.students.courseId}`)
            const wv = res.data
            this.setState({ workloadValidated: wv.length > 0 ? wv.reduce((a, c) => a + c) : 0 })
        } catch (e) {
            showError(e)
        }
    }

    loadActivitiesUser = async (student) => {
        try {
            this.setState({ loading: true })
            const res = await axios.get(`${server}/activities/${student.courseId}/courses/${student.userId}/users`)
            const resActivities = []
            resActivities.push(res.data)
            this.setState({ activities: resActivities }, /* this.filterActivities */)
            
            if (this.state.activities.length > 0) {
                this.setState({ student: student })
                this.setState({ showActivitiesUsers: true })
            }
            this.setState({ loading: false })
        } catch (e) {
            showError(e)
        }
    }

    getActivity = async (activityId) => {
        try {
            this.setState({ loading: true })
            const res = await axios.get(`${server}/activities/${activityId}`)
            this.setState({ activity: res.data })
            if (this.state.activity.id > 0) {
                this.setState({
                    showActivitiesUsers: false,
                    showActivityUser: true
                })
            }
            this.setState({ loading: false })
        } catch (e) {
            showError(e)
        }
    }

    loadingActivity = (item) => {
        this.setState({ activityId: item })
        this.getActivity(item)
    }

    saveValuation = async (newValuation) => {
        if (!newValuation.activityId) {
            Alert.alert('Dados Inválidos', 'activityId não informado.')
            return
        }
        if (!newValuation.valuation) {
            Alert.alert('Dados Inválidos', 'Avaliação não informada.')
            return
        }

        // TODO >> Se workloadValidated for vazio ou atribuir o valor de workload a ele
        if (!newValuation.workloadValidated) {
            Alert.alert('Dados Inválidos', 'workloadValidated não informado.')
            return
        }

        try {
            await axios.post(`${server}/valuations`, {
                activityId: newValuation.activityId,
                valuation: newValuation.valuation,
                justification: newValuation.justification,

            })

            await axios.put(`${server}/activities/${newValuation.activityId}/valuations`, {
                workloadValidated: newValuation.workloadValidated,
                completed: true
            })

            let msgNotification = ''

            if (newValuation.valuation == 1) {
                msgNotification = 'aceita.'
            } else if (newValuation.valuation == 2) {
                msgNotification = 'parcialmente recusada.'
            } else if (newValuation.valuation == 3) {
                msgNotification = 'totalmente recusada.'
            }

            await axios.post(`${server}/notifications`, {
                userRecipientId: newValuation.userId,
                activityId: newValuation.activityId,
                message: msgNotification,
                read: false
            })

            this.setState({
                showActivitiesUsers: true,
                showActivityUser: false
            })
            Alert.alert('Sucesso!', 'Avaliação registrada com sucesso.')
        } catch (e) {
            showError(e)
        }


    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ValuationsAdd
                    activity={this.state.activity}
                    isVisible={this.state.showActivityUser}
                    onCancel={() => this.setState({
                        showActivityUser: false,
                        showActivitiesUsers: true
                    })}
                    onSave={this.saveValuation}
                />

                <ActivitiesUsers
                    activities={this.state.activities}
                    isVisible={this.state.showActivitiesUsers}
                    onCancel={() => this.setState({ showActivitiesUsers: false })}
                    student={this.state.student}
                    onActivity={this.loadingActivity}
                />
                <Header
                    title='Avaliações'
                    bars={this.props.navigation.openDrawer}
                />

                {this.state.loading
                    && <ActivityIndicator color={commonStyles.colors.primary} size={50} style={{ marginTop: 150 }} />
                    ||
                    <View style={styles.app}>
                        <FlatList
                            data={this.state.students}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => { this.loadActivitiesUser(item) }}
                                >
                                    <Students {...item} />
                                </TouchableOpacity>
                            } />
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.secondary,

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
})
