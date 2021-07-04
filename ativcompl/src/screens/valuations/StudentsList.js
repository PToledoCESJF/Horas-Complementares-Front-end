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

            if(newValuation.valuation == 1){
                msgNotification = 'Show de bola mano'
            } else if(newValuation.valuation == 2){
                msgNotification = 'Meia boca'
            } else if(newValuation.valuation == 3){
                msgNotification = 'Deu ruim'
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


    // toggleFilter = () => {
    //     this.setState({ showDoneActivity: !this.state.showDoneActivity }, this.filterActivities)
    // }

    // filterActivities = () => {
    //     let visibleActivities = false
    //     if (this.state.showDoneActivity) {
    //         visibleActivities = [...this.state.activities]
    //     } else {
    //         const pending = activity => !activity.completed
    //         visibleActivities = this.state.activities.filter(pending)
    //     }
    //     this.setState({ visibleActivities })
    //     AsyncStorage.setItem('activityState', JSON.stringify({
    //         showDoneActivity: this.state.showDoneActivity
    //     }))
    // }

    // toggleActivity = async (activityId) => {
    //     try {
    //         await axios.put(`${server}/activities/${activityId}/toggle`)
    //         this.loadActivities()

    //     } catch (e) {
    //         showError(e)
    //     }
    // }


    // validationActivity = async (newActivity) => {

    //     if (!newActivity.name || !newActivity.name.trim()) {
    //         Alert.alert('Dados Inválidos', 'Nome da Atividade não informado.')
    //         return
    //     }
    //     if (!newActivity.courseId) {
    //         Alert.alert('Dados Inválidos', 'Curso não informado.')
    //         return
    //     }
    //     if (!newActivity.categoryId) {
    //         Alert.alert('Dados Inválidos', 'Categoria não informada.')
    //         return
    //     }

    //     if (newActivity.workload <= 0) {
    //         Alert.alert('Dados Inválidos', 'Carga horária não informada.')
    //         return
    //     } else {

    //         try {

    //             const resCourses = await axios.get(`${server}/courses/${newActivity.courseId}`)
    //             const courseSelected = resCourses.data

    //             if (newActivity.workload > courseSelected.limit) {
    //                 Alert.alert(
    //                     'Atenção',
    //                     `O limite de horas para uma atividade é de ${courseSelected.limit} horas.\nNão serão considerados valores acima deste limite\n\nDeseja registrar essa atividade?.`, [
    //                     {
    //                         text: 'Sim',
    //                         onPress: () => {
    //                             newActivity.workload = courseSelected.limit
    //                             this.addActivity(newActivity)
    //                         }
    //                     }, {
    //                         text: 'Não',
    //                         onPress: () => {
    //                             this.setState({ showActivitiesUsers: false })
    //                             this.loadActivities()
    //                             return
    //                         }
    //                     }
    //                 ])

    //             } else {
    //                 this.addActivity(newActivity)
    //             }

    //         } catch (e) {
    //             showError(e)
    //         }
    //     }
    // }

    // addActivity = async (newActivity) => {

    //     try {
    //         await axios.post(`${server}/activities`, {
    //             name: newActivity.name,
    //             start: newActivity.start,
    //             end: newActivity.end,
    //             workload: newActivity.workload,
    //             completed: newActivity.completed,
    //             categoryId: newActivity.categoryId,
    //             courseId: newActivity.courseId
    //         })

    //         this.setState({ showActivitiesUsers: false })
    //         this.loadActivities()
    //         Alert.alert('Sucesso!', 'Atividade registrada com sucesso.')

    //     } catch (e) {
    //         showError(e)
    //     }
    // }

    // getWorkloadCompleted = async () => {
    //     try {
    //         const res = await axios.get(`${server}/activitiesworkload`)
    //         const act = res.data
    //         this.setState({ workloadCompleted: act.reduce((a, c) => a + c) })

    //     } catch (e) {
    //         showError(e)
    //     }
    // }

    // certificateActivity = async (activity) => {
    //     if(!activity.id){
    //         Alert.alert('Dados Inválidos', 'Id da Atividade.')
    //         return
    //     }
    //     if(!activity.certificate || !activity.certificate.trim()){
    //         Alert.alert('Dados Inválidos', 'Certificado é um campo obrigatório.')
    //         return
    //     }
    //     try {
    //         await axios.put(`${server}/activities/${activity.id}/certificate`, {
    //             certificate: activity.certificate
    //         })

    //         this.setState({ showCertificateAdd: false })
    //         this.loadActivities()
    //         Alert.alert('Sucesso!', 'Certificado registrado com sucesso.')


    //     } catch (e) {
    //         showError(e)
    //     }
    // }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header title='Avaliações' />

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

                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
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
