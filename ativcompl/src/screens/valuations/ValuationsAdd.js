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
import { RadioButton } from 'react-native-paper'
import moment from 'moment'

import commonStyles from '../../commonStyles'

const initialState = {
    workloadValidated: '',
    checked: '',
    valuation: 0,
    justification: '',
}

export default class ValuationsAdd extends Component {

    state = ({ 
        workloadValidated: 
        this.props.activity.workloadValidated 
        ? this.props.activity.workloadValidated 
        : this.props.activity.workload 
    })

    getSave = () => {
        const valuation = {
            activityId: this.props.activity.id,
            valuation: this.state.valuation,
            justification: this.state.justification,
            workloadValidated: this.state.workloadValidated,
            userId: this.props.activity.userId
        }

        this.props.onSave && this.props.onSave(valuation)
    }

    clearModal = () => {
        this.setState({
            workloadValidated: ''
        })
        this.props.onCancel()
    }

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={() => this.clearModal()}
                animationType="slide">
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.iconBar}>
                            <TouchableOpacity
                                onPress={() => this.clearModal()} >
                                <Icon
                                    name="arrow-left"
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
                            <Text style={styles.label}>Atividade</Text>
                            <Text style={styles.input}>{this.props.activity.name}</Text>
                            <Text style={styles.label}>Url do Certificado</Text>
                            <TouchableOpacity
                            // onPress={() => this.save()}
                            >
                                <Text style={styles.input}>{this.props.activity.certificate}</Text>
                            </TouchableOpacity>

                            <View style={styles.dateHour}>
                                <View>
                                    <Text style={styles.label}>Início</Text>
                                    <Text style={styles.input}>{moment(this.props.activity.start).format('ddd, D [de] MMMM [de] YYYY')}</Text>
                                </View>
                                <View>
                                    <Text style={styles.label}>Término</Text>
                                    <Text style={styles.input}>{moment(this.props.activity.end).format('ddd, D [de] MMMM [de] YYYY')}</Text>
                                </View>
                            </View>
                            <View style={styles.dateHour}>
                                <View>
                                    <Text style={styles.label}>Carga horária</Text>
                                    <Text style={styles.input}>{this.props.activity.workload} horas</Text>
                                </View>
                                <View>
                                    <Text style={styles.label}>Horas válidas</Text>
                                    <TextInput style={styles.input}
                                        keyboardType='decimal-pad'
                                        onChangeText={workloadValidated => this.setState({ workloadValidated })}
                                        value={this.state.workloadValidated + ''}
                                    />
                                </View>
                            </View>

                            <View style={styles.checkGroup}>
                                <View style={styles.checkContainer}>
                                    <RadioButton
                                        value="accept"
                                        status={this.state.checked === 'accept' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ checked: 'accept', valuation: 1 })}
                                        color={commonStyles.colors.primary}
                                    />
                                    <Text style={styles.textBody}>Aceitar</Text>
                                </View>
                                <View style={styles.checkContainer}>
                                    <RadioButton
                                        value="denyPartial"
                                        status={this.state.checked === 'denyPartial' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ checked: 'denyPartial', valuation: 2 })}
                                        color='#FF8C00'
                                    />
                                    <Text style={styles.textBody}>Negar parcialmente</Text>
                                </View>
                                <View style={styles.checkContainer}>
                                    <RadioButton
                                        value="deny"
                                        status={this.state.checked === 'deny' ? 'checked' : 'unchecked'}
                                        onPress={() => this.setState({ checked: 'deny', valuation: 3 })}
                                        color='#FF0000'
                                    />
                                    <Text style={styles.textBody}>Negar totalmente</Text>
                                </View>
                            </View>
                            {
                                this.state.valuation > 1
                                &&
                                <View style={{ marginTop: 15 }}>
                                    <Text style={styles.label}>Justificativa</Text>
                                    <TextInput style={styles.input}
                                        onChangeText={justification => this.setState({ justification })}
                                        value={this.state.justification} />
                                </View>
                            }
                            <TouchableOpacity
                                onPress={() => this.getSave()}
                            >
                                <View style={styles.buttons} >
                                    <Text style={styles.button}>Salvar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView >
            </Modal >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.secondary,
        marginTop: 120

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
        marginTop: Platform.OS === 'ios' ? 40 : 5,
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
    dateHour: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
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
    checkGroup: {
        marginTop: 12,
    },
    checkContainer: {
        width: '90%',
        marginLeft: 20,
        flexDirection: 'row',
    },
    textBody: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        marginVertical: 4,
        fontSize: 14
    },
})