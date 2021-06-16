import React, { Component } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Alert,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { server, showError } from '../../common'
import topPage from '../../../assets/imgs/top_page_white.png'
import ProfileEdit from './ProfileEdit'
import commonStyles from '../../commonStyles'
import ProfileAddCourse from './ProfileAddCourse'

const initialState = {
    id: 0,
    name: '',
    registration: '',
    email: '',
    password: '',
    confirmPassword: '',
    startCourse: '',
    firstAccess: true,
    showProfileEdit: false,
    showProfileAddCourse: false,
    campus: []
}

export default class Profile extends Component {
    state = {
        ...initialState
    }

    componentDidMount = () => {
        try {
            const res = axios.get(`${server}/campus`)
            this.setState({ campus: res.data })
        } catch (e) {
            showError(e)
        }
        this.updatePage()
    }

    updatePage = () => {
        try {
            const res = axios.get(`${server}/profile`)
            const profiles = res.data
            if (profiles.length > 0) {
                this.setState(profiles.shift())
            }
        } catch (e) {
            showError(e)
        }
    }

    updateProfile = (proflieEdited) => {
        if (!proflieEdited.name || !proflieEdited.name.trim()) {
            Alert.alert('Dados Inválidos', 'Nome não informado.')
            return
        }
        if (!proflieEdited.registration || !proflieEdited.registration.trim()) {
            Alert.alert('Dados Inválidos', 'Matrícula não informado.')
            return
        }
        if (!proflieEdited.email || !proflieEdited.email.trim() || !proflieEdited.email.includes('@')) {
            Alert.alert('Dados Inválidos', 'Email inválido não informado.')
            return
        }

        try {
            axios.put(`${server}/profile/${this.state.id}`, {
                name: proflieEdited.name,
                registration: proflieEdited.registration,
                email: proflieEdited.email
            })

            // AsyncStorage.setItem('userData', JSON.stringify({ 
            //     name: proflieEdited.name,
            //     registration: proflieEdited.registration,
            //     email: proflieEdited.email
            // }))

            this.setState({ showProfileEdit: false })

            Alert.alert('Sucesso!', 'Seu perfil foi atualizado com sucesso.')

        } catch (e) {
            showError(e)
        }
        this.updatePage()
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <ProfileEdit {...this.state}
                    isVisible={this.state.showProfileEdit}
                    onCancel={() => this.setState({ showProfileEdit: false })}
                    onSave={this.updateProfile}
                />
                <ProfileAddCourse { ...this.state.campus }
                    isVisible={this.state.showProfileAddCourse}
                    onCancel={() => this.setState({ showProfileAddCourse: false })}
                    onSave={this.updateProfile}
                />
                <ImageBackground source={topPage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
                            size={20} color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.app}>
                    <Text style={styles.label}>Nome</Text>
                    <Text style={styles.input}>{this.state.name}</Text>
                    <Text style={styles.label}>Matrícula</Text>
                    <Text style={styles.input}>{this.state.registration}</Text>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.input}>{this.state.email}</Text>
                    <Text style={styles.label}>Cursos</Text>
                    <Text style={styles.input}>{this.state.password}</Text>
                    <TouchableOpacity onPress={() => this.setState({ showProfileEdit: true })}>
                        <View style={styles.buttons} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Editar perfil</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ showProfileAddCourse: true })}>
                        <View style={styles.buttons} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Iniciar curso</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
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
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 18
    },
});