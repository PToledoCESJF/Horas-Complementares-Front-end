import React, { useEffect, useState } from 'react';
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

import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'
const initialState = {
    user: {
        id: 0,
        name: "",
        email: "",
        address: "",
        fone: ""
    },
    courses: [
        {
            id: 0,
            name: "",
            workload: 0,
            totalWorkloadValidate: 0,
            activities: [
                {
                    id: 0,
                    institution: "",
                    name: "",
                    start: "",
                    end: "",
                    workloadValidated: 0,
                    certificate: "",
                    courseId: 0
                }
            ],
        }
    ],



}
export default props => {

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState(initialState.courses)
    const [activities, setActivities] = useState(initialState.courses.activities)
    const [user, setUser] = useState(initialState.user)
    const [objMail, setObjMail] = useState(initialState)
    const [address, setAddress] = useState()
    const [fone, setFone] = useState()
    const [workloadValidated, setWorkloadValidated] = useState(0)

    useEffect(() => {

        loadAddress()
        loadUser()
        loadCourses()

        getObjectMail()

    }, [])


    
    const loadActivities = async (courseId) => {
        try {
            const res = await axios.get(`${server}/activities/${courseId}/course_mail`)
            setActivities(res.data)

        } catch (e) {
            showError(e)
            Alert.alert('ERRO', 'ate')
        }
    }

    const loadWorkloadValidated = async (courseId) => {
        try {
            setLoading(true)

            const res = await axios.get(`${server}/activities/${courseId}/workloadValidate`)
            const wv = res.data
            const wvs = (wv !== null ? wv.reduce((a, c) => a + c) : 0)
            setWorkloadValidated(wvs.sum)
            setLoading(false)
        } catch (e) {
            showError(e)
            Alert.alert('ERRO', 'CARGA HORA')

        }
    }

    const loadCourses = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/users_courses_mail`)
            const resCourses = res.data
            const courses = []
            resCourses.forEach(c => {
                loadActivities(c.id)
                loadWorkloadValidated(c.id)
                    courses.push = ({
                    id: c.id,
                    name: c.name,
                    workload: c.workload,
                    totalWorkloadValidate: workloadValidated,
                    activities: activities
                })

                setCourses(courses)

            })

            // setObjMail({ course: res.data })

            setLoading(false)
        } catch (e) {
            showError(e)
            Alert.alert('ERRO', 'CURSO')
        }
    }

    const loadAddress = async () => {
        try {
            const res = await axios.get(`${server}/address_mail`)
            const resAddress = res.data
            const addressStr = (
                resAddress.street +
                ", " + resAddress.number +
                " - " + resAddress.district +
                " - " + resAddress.city
            )

            setAddress(addressStr.length > 0 ? addressStr : "")
            setFone(addressStr.length > 0 ? resAddress.fone : "")

        } catch (e) {
            showError(e)
        }
    }

    const loadUser = async () => {
        try {
            const res = await axios.get(`${server}/profile_mail`)
            const resUser = res.data
            const user = {
                id: resUser.id,
                name: resUser.name,
                email: resUser.email,
                address: address,
                fone: fone
            }

            setUser(user)

        } catch (e) {
            showError(e)
        }
    }

    const getObjectMail = () => {
        setObjMail({
            user: user,
            courses: courses
        })
    }

    console.warn(objMail)

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title='Evolução'
                bars={props.navigation.openDrawer}
            />
            {loading
                && <ActivityIndicator color={commonStyles.colors.primary} size={50} style={{ marginTop: 150 }} />
                ||
                <View style={styles.app}>
                    {/* <FlatList
                        data={courses}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Text>{item}</Text>
                        } /> */}



                </View>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    app: {

    }
})