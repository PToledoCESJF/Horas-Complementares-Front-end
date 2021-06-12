import React, { Component } from 'react'
import {
    Platform,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import commonStyles from '../../commonStyles'

const initialState = {
    name: '',
    start: new Date(),
    showDatePicker: false
}

export default class ActivityAdd extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newActivity = {
            name: this.state.name,
            start: this.state.start
        }
        
        this.props.onSave && this.props.onSave(newActivity)
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePiker = <DateTimePicker value={this.state.start}
            onChange={(_, start) => this.setState({ start, showDatePicker: false })}
            mode='date'
        />

        const dateString = moment(new Date()).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePiker}

                </View>
            )
        }
        return datePiker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide">
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Atividade</Text>
                    <TextInput style={styles.input}
                        placeholder="Nome da Atividade..."
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name} />
                    {this.getDatePicker()}
                    <View style={styles.buttons} >
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: 'rgba(0, 155, 217, 0.6)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#009bd9',
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
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
        fontSize: 13,
        marginLeft: 15
    }

})