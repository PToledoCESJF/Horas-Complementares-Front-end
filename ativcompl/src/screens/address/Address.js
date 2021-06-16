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
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import { server, showError } from '../../common'
import topPage from '../../../assets/imgs/top_page_white.png'
import commonStyles from '../../commonStyles'

const initialState = {
    id: 0,
    street: '',
    number: '',
    district: '',
    city: '',
    newAddress: true
}

export default class Address extends Component {
    state = {
        ...initialState
    }

    componentDidMount = () => {
        this.updatePage()
    }

    updatePage = async () => {
        try {
            const res = await axios.get(`${server}/address`)
            const listAddresses = res.data
            if (listAddresses.length > 0) {
                this.setState(listAddresses.shift())
                this.setState({ newAddress: false })
            }

        } catch (e) {
            showError(e)
        }
    }

    save = async () => {
        if (!this.state.street || !this.state.street.trim()) {
            Alert.alert('Dados Inválidos', 'Nome da rua não informado.')
            return
        }
        if (!this.state.city || !this.state.city.trim()) {
            Alert.alert('Dados Inválidos', 'Nome da cidade não informado.')
            return
        }

        if(this.state.newAddress && this.state.id === 0){
            try {
                await axios.post(`${server}/addresses`, {
                    street: this.state.street,
                    number: this.state.number,
                    district: this.state.district,
                    city: this.state.city
                })
                Alert.alert('Sucesso!', 'Endereço salvo com sucesso.')
            } catch (e) {
                showError(e)
            }

        } else {
            try {
                await axios.put(`${server}/addresses/${this.state.id}`, {
                    street: this.state.street,
                    number: this.state.number,
                    district: this.state.district,
                    city: this.state.city
                })
                
                Alert.alert('Sucesso!', 'Endereço salvo com sucesso.')
            } catch (e) {
                showError(e)
            }
        }   
        
        this.updatePage()     
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                    {this.state.newAddress &&
                        <TextInput style={styles.input}
                            placeholder="Logradouro..."
                            onChangeText={street => this.setState({ street })}
                            value={this.state.street} />
                        ||
                        <Text style={styles.nEdit}>{this.state.street}</Text>
                    }{this.state.newAddress &&
                        <TextInput style={styles.input}
                            placeholder="Número..."
                            onChangeText={number => this.setState({ number })}
                            value={this.state.number} />
                        ||
                        <Text style={styles.nEdit}>{this.state.number}</Text>
                    }{this.state.newAddress &&
                        <TextInput style={styles.input}
                            placeholder="Bairro..."
                            onChangeText={district => this.setState({ district })}
                            value={this.state.district} />
                        ||
                        <Text style={styles.nEdit}>{this.state.district}</Text>
                    }{this.state.newAddress &&
                        <TextInput style={styles.input}
                            placeholder="Cidade..."
                            onChangeText={city => this.setState({ city })}
                            value={this.state.city} />
                        ||
                        <Text style={styles.nEdit}>{this.state.city}</Text>
                    }{this.state.newAddress &&
                        <TouchableOpacity onPress={this.save}>
                            <View style={styles.buttons} >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Salvar</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        ||
                        <TouchableOpacity onPress={() => this.setState({ newAddress: true })}>
                            <View style={styles.buttons} >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Editar</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
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
        marginBottom: 20
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
        margin: 15,
        color: '#000',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        marginBottom: 10,
    },
    nEdit: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        color: '#708090',
        borderColor: '#A9A9A9',
        borderBottomWidth: 1,
        marginBottom: 10,
        backgroundColor: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5

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