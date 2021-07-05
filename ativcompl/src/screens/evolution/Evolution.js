import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native'
import axios from 'axios'

import EvoluationCard from '../../components/evoluation/EvoluationCard'

import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'
const initialState = {

    activities: '',
    workloadValidated: 0,
    courses: '',
    user: '',
    address: '',
    fone: '',

    loading: false,

}

export default class Evolution extends Component {

    state = { ...initialState }

    componentDidMount = () => {

        this.loadAddress()
        this.loadUser()
        this.loadCourses()

    }

    loadActivities = async (courseId) => {
        try {
            this.setState({ loading: true })
            const res = await axios.get(`${server}/activities/${courseId}/course_mail`)
            this.setState({ activities: res.data })
            this.setState({ loading: false })
        } catch (e) {
            showError(e)
            Alert.alert('ERRO', 'ate')
        }
    }

    loadWorkloadValidated = async (courseId) => {
        try {
            this.setState({ loading: true })

            const res = await axios.get(`${server}/activities/${courseId}/workloadValidate`)
            const wv = res.data
            const wvs = (wv !== null ? wv.reduce((a, c) => a + c) : 0)
            this.setState({ workloadValidated: wvs.sum })
            this.setState({ loading: false })

        } catch (e) {
            showError(e)
            Alert.alert('ERRO', 'CARGA HORA')
        }
    }

    loadCourses = async () => {
        try {
            this.setState({ loading: true })
            const res = await axios.get(`${server}/users_courses_mail`)
            const resCourses = res.data
            const coursesList = [{}] 
            let setCourse
            resCourses.forEach(async (c) => {
                await this.loadActivities(c.id)
                await this.loadWorkloadValidated(c.id)
                const course = {
                    id: c.id,
                    name: c.name,
                    workload: c.workload,
                    workloadValidated: this.state.workloadValidated,
                    activities: this.state.activities
                }
                coursesList.push(course)
                                
            })
            this.setState({ courses: coursesList })

            this.setState({ loading: false })
        } catch (e) {
            showError(e)
            Alert.alert('ERRO', 'CURSO')
        }
    }

    loadAddress = async () => {
        try {
            const res = await axios.get(`${server}/address_mail`)
            const resAddress = res.data
            const addressStr = (
                resAddress.street +
                ", " + resAddress.number +
                " - " + resAddress.district +
                " - " + resAddress.city
            )

            this.setState({ address: addressStr.length > 0 ? addressStr : "" })
            this.setState({ fone: addressStr.length > 0 ? resAddress.fone : "" })

        } catch (e) {
            showError(e)
        }
    }

    loadUser = async () => {
        try {
            const res = await axios.get(`${server}/profile_mail`)
            const resUser = res.data
            const user = {
                id: resUser.id,
                name: resUser.name,
                email: resUser.email,
                address: this.state.address,
                fone: this.state.fone
            }

            this.setState({ user: user })

        } catch (e) {
            showError(e)
        }
    }

    sendMail = async (newSend) => {
        
        try {
            axios.post(`${server}/sendmail`, {
                user: {
                    id: this.state.user.id,
                    name: this.state.user.name,
                    email: this.state.user.email,
                    address: this.state.user.address,
                    fone: this.state.user.fone
                },
                course: newSend.course,
                activities: newSend.activities,
                totalWorkload: newSend.totalWorkload
            })
        } catch (e) {
            showError(e)
        }

    }
 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    title='Evolução'
                    bars={this.props.navigation.openDrawer}
                />
                {this.state.loading
                    && <ActivityIndicator color={commonStyles.colors.primary} size={50} style={{ marginTop: 150 }} />
                    ||
                    <View style={styles.app}>
                        <FlatList
                            data={this.state.courses}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) =>
                                <EvoluationCard {...item} onSend={this.sendMail} />

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
    },
    app: {

    }
})