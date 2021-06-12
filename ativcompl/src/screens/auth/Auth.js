import React, { Component } from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import backgroundImage from '../../../assets/imgs/welcome.png'
import commonStyles from '../../commonStyles'
export default class Auth extends Component {

    state = {
        name: '',
        registration: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert('Sucesso!', 'Criar conta')
        } else {
            Alert.alert('Socesso!', 'Logar')
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage}
                style={styles.backgroud}>
                <Text style={styles.title}>Atividades Complementares</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <TextInput placeholder='Nome' value={this.state.name}
                            style={styles.input} onChangeText={name => this.setState({ name })} />
                    }
                    <TextInput placeholder='Matrícula' value={this.state.registration}
                        style={styles.input} onChangeText={registration => this.setState({ registration })} />
                    <TextInput placeholder='Senha' value={this.state.password}
                        style={styles.input} secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <TextInput placeholder='Confirmação de Senha' value={this.state.confirmPassword}
                            style={styles.input} secureTextEntry={true}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
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
        fontSize: 30,
        marginBottom: 10
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
        padding: Platform.OS === 'ios' ? 15 : 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
})
