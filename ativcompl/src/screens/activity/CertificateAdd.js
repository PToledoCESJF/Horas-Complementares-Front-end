import React, { Component } from 'react'
import {
    Platform,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../../commonStyles'
import Header from '../../components/header/Header'

export default class CertificateAdd extends Component {

    state = { ...this.props }

    save = () => {
        const activity = {
            id: this.props.id,
            certificate: this.state.certificate
        }

        this.props.onSave && this.props.onSave(activity)

    }

    render() {
        return (
            <Modal transparent={false}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide">
                <SafeAreaView style={styles.container}>
                    <Header
                        title='Atividades'
                        onCancel={this.props.onCancel}
                    />
                    <ScrollView>
                        <View style={styles.app}>
                            <Text style={styles.label}>Nome</Text>
                            <Text style={styles.input}>{this.props.name}</Text>
                            <Text style={styles.label}>Início</Text>
                            <Text style={styles.input}>{moment(this.props.start).format('ddd, D [de] MMMM [de] YYYY')}</Text>
                            <Text style={styles.label}>Término</Text>
                            <Text style={styles.input}>{moment(this.props.end).format('ddd, D [de] MMMM [de] YYYY')}</Text>
                            <Text style={styles.label}>Carga horária</Text>
                            <Text style={styles.input}>{this.props.workload}</Text>
                            <Text style={styles.label}>Url do Certificado</Text>
                            <TextInput
                                style={styles.input}
                                autoFocus
                                autoCapitalize={'none'}
                                placeholder='Url do certificado...'
                                keyboardType='url'
                                onChangeText={certificate => this.setState({ certificate })}
                                value={this.state.certificate}
                            />
                            <TouchableOpacity
                                onPress={() => this.save()}
                            >
                                <View style={styles.buttons} >
                                    <Text style={styles.button}>Salvar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        marginHorizontal: 18,
        color: '#000',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        marginBottom: 5,
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
})