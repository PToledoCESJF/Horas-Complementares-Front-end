import React, { Component } from 'react'
import {
    Platform,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import commonStyles from '../../commonStyles'
import { server, showError } from '../../common'
import Header from '../../components/header/Header'

const initialState = {
    start: new Date(),
    courseId: 1,
    courses: [],
    showDateStartPicker: false,
}

export default class UserCourse extends Component {

    state = { ...initialState }
    // !this.props.route.params ? initialState
    //     : {
    //         start: this.props.route.params.start,
    //         courseId: this.props.route.params.courseId,
    //     }

    componentDidMount = async () => {
        try {
            const resCourse = await axios.get(`${server}/courses`)
            this.setState({ courses: resCourse.data })
        } catch (e) {
            showError(e)
        }
    }

    // addUserCourse = async () => {
    //     if (this.state.courseId <= 0) {
    //         Alert.alert('Dados Inválidos', 'Curso não informado.')
    //         return
    //     }

    //     try {
    //         await axios.post(`${server}/users_courses`, {
    //             start: this.state.start,
    //             courseId: this.state.courseId,
    //         })

    //         Alert.alert('Sucesso!', 'Curso cadastrado com sucesso.')

    //         this.props.onCancel && this.props.onCancel()

    //     } catch (e) {
    //         Alert.alert('Erro!', 'Curso não cadastrado.')
    //         showError(e)
    //     }
    // }

    save = () => {
        const newCourse = {
            start: this.state.start,
            courseId: this.state.courseId
        }

        this.props.onSave && this.props.onSave(newCourse)
    }

    getDateStarPicker = () => {
        let datePiker =
            <DateTimePicker value={this.state.start}
                onChange={(_, start) => this.setState({ start, showDateStartPicker: false })}
                mode='date'
            />

        const dateString = moment(this.state.start).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDateStartPicker: true })}>
                        <Text style={styles.date}>
                            {`Início: ${dateString}`}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDateStartPicker && datePiker}
                </View>
            )
        }
        return datePiker
    }

    getCourse = () => {
        return (
            <View>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.courseId}
                    onValueChange={(itemValue) =>
                        this.setState({ courseId: itemValue })
                    }>
                    {
                        this.state.courses.map(course => {
                            return <Picker.Item label={course.name} value={course.id} key={course.id} />
                        })
                    }
                </Picker>
            </View>
        )
    }


    render() {
        return (
            <Modal transparent={false}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide">
                <SafeAreaView style={styles.container}>
                    <Header title='Cursos' />
                    <View style={styles.iconBar}>
                        {/* <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon
                                name={'bars'}
                                size={20} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.goBack()} 
                            onPress={() => this.props.onCancel()}
                        >
                            <Icon
                                name="arrow-circle-left"
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity /* onPress={() => this.props.navigation.openDrawer()} */>
                            <Icon
                                name={'bell-o'}
                                size={20} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.app}>

                        <Text style={styles.label}>Início</Text>
                        {this.getDateStarPicker()}
                        <Text style={styles.label}>Curso</Text>
                        {this.getCourse()}
                        <TouchableOpacity onPress={() => this.save()}>
                        <View style={styles.buttons} >
                            <Text style={styles.button}>Salvar</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    app: {
        flex: 8,
        backgroundColor: '#FFF',
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        marginBottom: 20,
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
        margin: 15,
        borderRadius: 10
    },
    button: {
        padding: 10,
        alignItems: 'center',
        color: commonStyles.colors.secondary,
        fontSize: 18
    },
    label: {
        fontFamily: commonStyles.fontFamily,
        height: 20,
        marginHorizontal: 18,
        color: commonStyles.colors.primary,
        borderColor: '#A9A9A9',
        backgroundColor: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 20,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
    },
    picker: {
        fontFamily: commonStyles.fontFamily,
        marginBottom: 10,
    },
})