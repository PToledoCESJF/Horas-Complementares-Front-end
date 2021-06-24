import React, { Component } from 'react'
import {
    Platform,
    View,
    SafeAreaView,
    ImageBackground,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import commonStyles from '../../commonStyles'
import { server, showError } from '../../common'
import topPage from '../../../assets/imgs/top_page_white.png'

const initialState = {
    id: '',
    name: '',
    start: new Date(),
    end: new Date(),
    workload: '',
    categorySelected: '',
    courseSelected: '',
    categories: [],
    courses: [],
    showDateStartPicker: false,
    showDateEndPicker: false,
}

export default class ActivityAdd extends Component {

    state = !this.props.route.params ? initialState
    : {
        id: this.props.route.params.id,
        name: this.props.route.params.name,
        start: this.props.route.params.start,
        end: this.props.route.params.end,
        workload: this.props.route.params.workload,
        categorySelected: this.props.route.params.categoryId,
        courseSelected: this.props.route.params.courseId
    } 

    componentDidMount = async () => {
                
        try {
            const resCategory = await axios.get(`${server}/categories`)
            const resCourse = await axios.get(`${server}/courses`)
            this.setState({ categories: resCategory.data, courses: resCourse.data })
        } catch (e) {
            showError(e)
        }

        // this.setState(this.props.route.params ? this.props.route.params : initialState )

    }

    save = () => {
        const newActivity = {
            name: this.state.name,
            start: this.state.start,
            workload: this.state.workload,

            categoryId: this.state.categorySelected,
        }

        this.props.onSave && this.props.onSave(newActivity)
        this.setState({ ...initialState })
    }

    addActivity = async () => {
        if (!this.state.name || !this.state.name.trim()) {
            Alert.alert('Dados Inválidos', 'Nome da Atividade não informado.')
            return
        }

        try {
            await axios.post(`${server}/activities`, {
                name: this.state.name,
                start: this.state.start,
                end: this.state.end,
                workload: this.state.workload,
                categoryId: this.state.categoryId,
                completed: false,
                categoryId: this.state.categorySelected,
                courseId: this.state.courseSelected
            })

            this.props.navigation.goBack()

        } catch (e) {
            showError(e)
        }
    }

    getDateEndPicker = () => {
        let datePiker =
            <DateTimePicker value={this.state.end}
                onChange={(_, end) => this.setState({ end, showDateEndPicker: false })}
                mode='date'
            />

        const dateString = moment(this.state.end).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDateEndPicker: true })}>
                        <Text style={styles.date}>
                            {`Término: ${dateString}`}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDateEndPicker && datePiker}
                </View>
            )
        }
        return datePiker
    }

    getDateStarPicker = () => {
        let datePiker =
            <DateTimePicker value={this.state.start}
                onChange={(_, start) => this.setState({ start, showDateStartPicker: false })}
                mode='date'
            />

        const dateString = moment(this.state.start).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDateStartPicker: true })}>
                        <Text style={styles.date}>
                            {`Início: ${dateString}`}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDateStartPicker && datePiker}
                </View>
            )
        }
        return datePiker
    }

    getCategory = () => {
        return (
            <View>
                <Picker
                    // style={styles.picker}
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

    getCourse = () => {
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


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <ImageBackground source={topPage}
                        style={styles.background}>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.iconBar}>
                        <TouchableOpacity /* style={styles.addButton} */
                            onPress={() => this.props.navigation.goBack()} >
                            <Icon
                                name="arrow-left"
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity /* onPress={() => this.props.navigation.openDrawer()} */>
                            <Icon
                                name={'bars'}
                                size={20} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity /* onPress={() => this.props.navigation.openDrawer()} */>
                            <Icon
                                name={'bell-o'}
                                size={20} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.app}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput style={styles.input}
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name} />
                        <Text style={styles.label}>Início</Text>
                        {this.getDateStarPicker()}
                        <Text style={styles.label}>Término</Text>
                        {this.getDateEndPicker()}
                        <Text style={styles.label}>Carga horária</Text>
                        <TextInput style={styles.input}
                            onChangeText={workload => this.setState({ workload })}
                            value={this.state.workload} />
                        <Text style={styles.label}>Catigoria</Text>
                        {this.getCategory()}
                        <Text style={styles.label}>Curso</Text>
                        {this.getCourse()}
                        <View style={styles.buttons} >
                            <TouchableOpacity onPress={() => this.addActivity()}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </ScrollView>
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
    courses: {
        fontFamily: commonStyles.fontFamily,
        height: 30,
        marginHorizontal: 18,
        color: commonStyles.colors.tertiaryTransparency,
        backgroundColor: '#FFF',
        fontSize: 18,
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
    editFields: {
        fontFamily: commonStyles.fontFamily,
        width: 320,
        backgroundColor: '#FFF',
    },
    editLabel: {
        height: 25,
        fontSize: 12,
        fontWeight: 'bold',
        color: commonStyles.colors.primary,
    },
    editInput: {
        height: 40,
        color: commonStyles.colors.tertiary,
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
    },
    editComp: {
        height: 90,
        width: '90%',
        flexDirection: "row",
        marginHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    editButtom: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 20,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
    },
    picker: {
        fontFamily: commonStyles.fontFamily,
        marginBottom: 10,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },


})