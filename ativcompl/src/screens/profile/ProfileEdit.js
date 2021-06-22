import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'

import commonStyles from '../../commonStyles'

const initialState = {
    name: '',
    email: '',
    loading: false,
    editar: false
}
export default class ProfileEdit extends Component {

    state = { ...initialState }

    componentDidMount = () => {
        this.setState({ loading: true })
        this.loadProfile()
        this.setState({ loading: false })
    }

    loadProfile = async () => {
        this.setState(await this.props)
        //     name: await this.props.name,
        //     email: await this.props.email,
        // })
    }

    getView = () => {


    }

    save = () => {
        const proflieEdited = {
            name: this.state.name,
            email: this.state.email
        }

        this.props.onSave && this.props.onSave(proflieEdited)
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
                        <Text style={styles.header}>Editar perfil</Text>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput style={styles.input}
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name} />
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email} />
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
    category: {
        fontFamily: commonStyles.fontFamily,
        marginBottom: 10,
    }

})