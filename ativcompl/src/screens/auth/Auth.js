import React, { Component } from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import backgroundImage from '../../../assets/imgs/welcome.png'
import commonStyles from '../../commonStyles'
import AuthInput from '../../components/auth/AuthInput';
import { server, showError, showSuccess } from '../../common'

const initialState = {
    name: '',
    registration: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    usertypeId: 1,
    stageNew: false,
}
export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                registration: this.state.registration,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                avatar: this.state.avatar,
                usertypeId: this.state.usertypeId
            })

            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                registration: this.state.registration,
                password: this.state.password
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            const login = res.data
            if(login.usertypeId == 1){
                if(login.userCourse != null){
                    this.props.navigation.navigate('Home', res.data)
                } else {
                    this.props.navigation.navigate('HomeFA', res.data)
                    Alert.alert('Atenção', 'Você precisa iniciar um curso para registrar atividades')
                }
            } else {
                this.props.navigation.navigate('HomeCS', res.data)
            }
        } catch (e) {
            showError(e)
        }

    }

    render() {
        const validations = []
        validations.push(this.state.registration)
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.email && this.state.email.includes('@'))
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.backgroud}>
                <Text style={styles.title}>{`Atividades Complementares`}</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name}
                            style={styles.input} onChangeText={name => this.setState({ name })} />
                    }
                    {this.state.stageNew &&
                        <AuthInput icon='at' placeholder='Email' value={this.state.email}
                            style={styles.input} onChangeText={email => this.setState({ email })} />
                    }
                    <AuthInput icon='registered' placeholder='Matrícula' value={this.state.registration}
                        style={styles.input} onChangeText={registration => this.setState({ registration })} />
                    <AuthInput icon='lock' placeholder='Senha' value={this.state.password}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' placeholder='Confirmação de Senha' value={this.state.confirmPassword}
                            style={styles.input} secureTextEntry={true}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>

                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        alignItems: 'center',
        fontSize: 25,
        marginBottom: 30,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20,
        width: '90%'

    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#32CD32',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
})
