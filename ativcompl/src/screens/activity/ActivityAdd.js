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

import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import moment from 'moment'

import commonStyles from '../../commonStyles'
import { server, showError } from '../../common'

const initialState = {
    name: '',
    start: new Date(),
    workload: '',
    hoursCompleted: '',
    categorySelected: '',
    categories: [],
    showDatePicker: false,
}

export default class ActivityAdd extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get(`${server}/categories`)
            this.setState({ categories: res.data })
        } catch (e) {
            showError(e)
        }
    }

    save = () => {
        const newActivity = {
            name: this.state.name,
            start: this.state.start,
            workload: this.state.workload,
            hoursCompleted: this.state.hoursCompleted,
            categoryId: this.state.categorySelected,
        }

        this.props.onSave && this.props.onSave(newActivity)
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePiker = <DateTimePicker value={this.state.start}
            onChange={(_, start) => this.setState({ start, showDatePicker: false })}
            mode='date'
        />

        const dateString = moment(this.state.start).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {`Início: ${dateString}`}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePiker}
                </View>
            )
        }
        return datePiker
    }

    getCategory = () => {
        return (
            <View>
                <Picker
                    style={styles.category}
                    selectedValue={this.state.categorySelected}
                    onValueChange={(itemValue) =>
                        this.setState({ categorySelected: itemValue })
                    }>
                    {
                        this.state.categories.map(cat => {
                            return <Picker.Item label={cat.name} value={cat.id} key={cat.id} />
                        })
                    }
                </Picker>
            </View>
        )
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
                        placeholder="Atividade..."
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name} />
                    {this.getCategory()}
                    {this.getDatePicker()}
                    <TextInput style={styles.input}
                        placeholder="Carga horária..."
                        onChangeText={workload => this.setState({ workload })}
                        value={this.state.workload} />
                    <TextInput style={styles.input}
                        placeholder="Horas completadas..."
                        onChangeText={hoursCompleted => this.setState({ hoursCompleted })}
                        value={this.state.hoursCompleted} />
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
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        color: '#000',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        
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
    category:{ 
        fontFamily: commonStyles.fontFamily, 
        marginBottom: 10,
    }

})