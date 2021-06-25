import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native'

import axios from 'axios'
import { Picker } from '@react-native-picker/picker'

import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'

const initialState = {
    usertypeId: 1,
    courses: [],
    courseSelected: 0,
    loading: false,
}
export default class ProfileAddCourse extends Component {

    state = {
        ...initialState
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        this.loadCourses()
        this.setState({ loading: false })
    }

    

    loadCourses = async () => {

        try {
            const res = await axios.get(`${server}/courses`)
            this.setState({ courses: res.data })
        } catch (e) {
            showError(e)
        }

    }

    getCourses = () => {
        return (
            <View>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.courseSelected}
                    onValueChange={(itemValue) =>
                        this.setState({ courseSelected: itemValue })
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

    save = () => {
        if (this.state.courseSelected <= 0) {

            Alert.alert('Dados Inválidos', 'Curso courseSelected.')
        }
        const newCourse = {
            courseId: this.state.courseSelected,
            usertypeId: this.state.usertypeId
        }

        this.props.onSave && this.props.onSave(newCourse)
    }

    render() {

        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide">
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                {this.state.loading
                    && <ActivityIndicator color={commonStyles.colors.primary}
                        size={50} style={{ alignContent: 'center', height: '40%' }} />
                    ||
                    <View style={styles.container}>
                        <Text style={styles.header}>Cursos</Text>

                        <Text style={styles.label}>Cursos</Text>
                        {this.getCourses()}
                        <Text style={styles.divider} />
                        <View style={styles.buttons} >
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.6)',

    },
    container: {
        backgroundColor: '#FFF',
        borderWidth: 18,
        borderColor: 'rgba(0,0,0, 0.6)',
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#009bd9',
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        marginBottom: 20,
    },
    label: {
        fontFamily: commonStyles.fontFamily,
        height: 20,
        marginHorizontal: 18,
        color: '#708090',
        borderColor: '#A9A9A9',
        backgroundColor: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',

    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        marginHorizontal: 18,
        color: '#000',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        marginBottom: 12,

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#009bd9',
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 15
    },
    picker: {
        fontFamily: commonStyles.fontFamily,
        // marginBottom: 10,
    },
    divider: {
        marginHorizontal: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',

    }

})