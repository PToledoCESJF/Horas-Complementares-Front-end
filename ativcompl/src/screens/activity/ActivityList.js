import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { server, showError } from '../../common'
import Activity from '../../components/activity/Activity'
import ActivityHoursCompleted from '../../components/activity/ActivityHoursCompleted'
import Header from '../../components/header/Header'
import commonStyles from '../../commonStyles'
import ActivityAdd from './ActivityAdd'
import CertificateAdd from './CertificateAdd'

const initialState = {
    showActivityAdd: false,
    showCertificateAdd: false,
    item: '',
    showDoneActivity: true,
    visibleActivities: [],
    activities: [],
    workloadCompleted: '',
}
export default class ActivityList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('activityState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneActivity: savedState.showDoneActivity
        }, this.filterActivities)
        this.getWorkloadCompleted()
        this.loadActivities()
    }

// ude.my/UC-27e8929b-a26f-4464-af05-f714237d15e5

    // TODO >> converter essa funcionalidade para outros fins
    // loadActivities = async () => {
    //     try {
    //         const maxDate = moment().format('YYYY-MM-10 23:59:59')
    //         const res = await axios.get(`${server}/activities?start=${maxDate}`)
    //         this.setState({ activities: res.data }, this.filterActivities)
    //     } catch (e) {
    //         showError(e)
    //     }
    // }

    loadActivities = async () => {
        try {
            const res = await axios.get(`${server}/activities`)
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

    toggleActivity = async (activityId) => {
        try {
            await axios.put(`${server}/activities/${activityId}/toggle`)
            this.loadActivities()

        } catch (e) {
            showError(e)
        }
    }

    deleteActivity = async (activityId) => {
        try {
            await axios.delete(`${server}/activities/${activityId}`)
            this.loadActivities()
        } catch (e) {
            showError(e)
        }
    }

    validationActivity = async (newActivity) => {

        if (!newActivity.name || !newActivity.name.trim()) {
            Alert.alert('Dados Inválidos', 'Nome da Atividade não informado.')
            return
        }
        if (!newActivity.courseId) {
            Alert.alert('Dados Inválidos', 'Curso não informado.')
            return
        }
        if (!newActivity.categoryId) {
            Alert.alert('Dados Inválidos', 'Categoria não informada.')
            return
        }

        if (newActivity.workload <= 0) {
            Alert.alert('Dados Inválidos', 'Carga horária não informada.')
            return
        } else {

            try {

                const resCourses = await axios.get(`${server}/courses/${newActivity.courseId}`)
                const courseSelected = resCourses.data

                if (newActivity.workload > courseSelected.limit) {
                    Alert.alert(
                        'Atenção',
                        `O limite de horas para uma atividade é de ${courseSelected.limit} horas.\nNão serão considerados valores acima deste limite\n\nDeseja registrar essa atividade?.`, [
                        {
                            text: 'Sim',
                            onPress: () => {
                                newActivity.workload = courseSelected.limit
                                this.addActivity(newActivity)
                            }
                        }, {
                            text: 'Não',
                            onPress: () => {
                                this.setState({ showActivityAdd: false })
                                this.loadActivities()
                                return
                            }
                        }
                    ])

                } else {
                    this.addActivity(newActivity)
                }

            } catch (e) {
                showError(e)
            }
        }
    }

    addActivity = async (newActivity) => {

        try {
            await axios.post(`${server}/activities`, {
                name: newActivity.name,
                start: newActivity.start,
                end: newActivity.end,
                workload: newActivity.workload,
                completed: newActivity.completed,
                categoryId: newActivity.categoryId,
                courseId: newActivity.courseId
            })

            this.setState({ showActivityAdd: false })
            this.loadActivities()
            Alert.alert('Sucesso!', 'Atividade registrada com sucesso.')

        } catch (e) {
            showError(e)
        }
    }

    getWorkloadCompleted = async () => {
        try {
            const res = await axios.get(`${server}/activitiesworkload`)
            const act = res.data
            this.setState({ workloadCompleted: act.reduce((a, c) => a + c) })

        } catch (e) {
            showError(e)
        }
    }

    certificateActivity = async (activity) => {
        if(!activity.id){
            Alert.alert('Dados Inválidos', 'Id da Atividade.')
            return
        }
        if(!activity.certificate || !activity.certificate.trim()){
            Alert.alert('Dados Inválidos', 'Certificado é um campo obrigatório.')
            return
        }
        try {
            await axios.put(`${server}/activities/${activity.id}/certificate`, {
                certificate: activity.certificate
            })

            this.setState({ showCertificateAdd: false })
            this.loadActivities()
            Alert.alert('Sucesso!', 'Certificado registrado com sucesso.')
            
            
        } catch (e) {
            showError(e)
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityAdd {...this.state}
                    isVisible={this.state.showActivityAdd}
                    onCancel={() => this.setState({ showActivityAdd: false })}
                    onSave={this.validationActivity}
                />
                <CertificateAdd {...this.state.item}
                    isVisible={this.state.showCertificateAdd}
                    onCancel={() => this.setState({ showCertificateAdd: false })}
                    onSave={this.certificateActivity}
                />
                <Header 
                    title='Atividades'
                    bars={this.props.navigation.openDrawer}
                    toggleFilter={this.toggleFilter}
                />
                <View style={styles.app}>
                    <ActivityHoursCompleted {...this.state} />
                    <FlatList
                        data={this.state.visibleActivities}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => this.setState({ item: item, showCertificateAdd: true})}
                                >
                                    <Activity {...item} onToggleActivity={this.toggleActivity} onDelete={this.deleteActivity} />
                                </TouchableOpacity>
                        } />
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
        flex: 1,
        backgroundColor: commonStyles.colors.secondary,

    },
    background: {
        flex: 2
    },
    app: {
        flex: 8,
        marginTop: 20,
        paddingBottom: 60
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