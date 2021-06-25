import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '../../common'
import Course from '../../components/course/Course'
import Header from '../../components/header/Header'
import commonStyles from '../../commonStyles'

const initialUserCourse = {
    start: new Date(),
    courseId: '',
    usertypeId: '',
}
export default function UserCourse(props) {

    const [userCourses, setUserCourses] = useState([])
    const [courses, setCourses] = useState([])
    const [userCourse, setUserCourse] = useState(initialUserCourse)
    const [showDateStartPicker, setShowDateStartPicker] = useState(false)

    useEffect(async () => {

        try {
            const resCourses = await axios.get(`${server}/courses`)
            setCourses(resCourses.data)
            const resUserCourse = await axios.get(`${server}/users_courses`)
            setUserCourses(resUserCourse.data)
            // getUserCourse()
        } catch (e) {
            showError(e)
        }

    }, [])

    function getDateStarPicker() {
        let datePiker =
            <DateTimePicker value={userCourse.start}
                onChange={(_, start) => setUserCourse({ start }), setShowDateStartPicker(false)}
                mode='date'
            />

        const dateString = moment(userCourse.start).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => setShowDateStartPicker(true)}>
                        <Text style={styles.date}>
                            {`Início: ${dateString}`}
                        </Text>
                    </TouchableOpacity>
                    {showDateStartPicker && datePiker}
                </View>
            )
        }
        return datePiker
    }


    // const getUserCourse = () => {
    //     const courseList = []
    //     if (userCourses.length) {
    //         courses.forEach(c => {
    //             if (userCourses.filter(uc => uc.courseId == c.id)) {
    //                 courseList.push({
    //                     id: c.id,
    //                     name: c.name,
    //                     selected: true
    //                 })
    //             }
    //         })
    //     } else {
    //         courses.forEach(c => {
    //             courseList.push([{
    //                 id: c.id,
    //                 name: c.name,
    //                 selected: true
    //             }])
    //         })
    //     }
    //     setCourseSelected(courseList)
    // }

    // const loadCourse = async () => {
    //     try {
    //         const resCourses = await axios.get(`${server}/courses`)
    //         setCourses(resCourses.data)
    //     } catch (e) {
    //         showError(e)

    //     }
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Cursos' />
            <View style={styles.iconBar}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
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
            <View style={styles.app}>
                <Text style={styles.label}>Início</Text>
                {
                    Platform.OS != 'android'
                    && <DateTimePicker value={userCourse.start}
                        onChange={(_, start) => setUserCourse({ start }), setShowDateStartPicker(false)}
                        mode='date'
                    />
                    || 
                    <View>
                        <TouchableOpacity onPress={() => setShowDateStartPicker(true)}>
                            <Text style={styles.date}>
                                {`Início: ${moment(userCourse.start).format('ddd, D [de] MMMM [de] YYYY')}`}
                            </Text>
                        </TouchableOpacity>
                        {!showDateStartPicker}
                    </View>
                }

                {/* <FlatList
                    data={courses}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <Course {...item} />
                    } />
                */}
            </View>
            {/* <TouchableOpacity style={styles.addButton}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('ActivityAdd')}
            >
                <Icon name="plus" size={20} color="#FFF" />
            </TouchableOpacity> */}
        </SafeAreaView>
    )
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