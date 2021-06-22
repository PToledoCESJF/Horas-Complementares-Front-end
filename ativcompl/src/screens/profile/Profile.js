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
    TextInput,
    ActivityIndicator,
    FlatList,
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
    name: '',
    registration: '',
    email: '',
    firstAccess: true,
    showProfileEdit: false,
    showProfileAddCourse: false,
    loading: false,
    courses: [],
    editName: false,
    editMail: false,
}

export default class Profile extends Component {
    state = {
        ...initialState
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        this.loadProfile()
        this.loadCourses()
        this.setState({ loading: false })
    }

    loadProfile = async () => {
        try {
            const res = await axios.get(`${server}/profile`)
            const profiles = res.data
            if (profiles.length > 0) {
                this.setState(profiles.shift())
            }
        } catch (e) {
            showError(e)
        }
    }

    loadCourses = async () => {

        try {
            const resUserCourses = await axios.get(`${server}/users_courses`)
            this.setState({ courses: resUserCourses.data })

        } catch (e) {
            showError(e)
        }
    }

    updateProfile = (proflieEdited) => {
        if (!proflieEdited.name || !proflieEdited.name.trim()) {
            Alert.alert('Dados Inválidos', 'Nome não informado.')
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

            AsyncStorage.mergeItem('userData', JSON.stringify({
                name: proflieEdited.name,
                email: proflieEdited.email
            }))

            this.setState({ showProfileEdit: false, editName: false, editMail: false })

            Alert.alert('Sucesso!', 'Seu perfil foi atualizado com sucesso.')

        } catch (e) {
            showError(e)
        }
        this.loadProfile()
    }

    addCourse = async campusCourse => {
        if (campusCourse.courseId <= 0) {
            Alert.alert('Dados Inválidos', 'Curso não informado.')
            return
        }

        try {
            await axios.post(`${server}/users_courses`, {
                courseId: campusCourse.courseId,
                usertypeId: campusCourse.usertypeId
            })

            this.setState({ showProfileAddCourse: false })

            Alert.alert('Sucesso!', 'Curso iniciado com sucesso.')

        } catch (e) {
            showError(e)
        }

        this.loadProfile()

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ProfileEdit {...this.state}
                    isVisible={this.state.showProfileEdit}
                    onCancel={() => this.setState({ showProfileEdit: false })}
                    onSave={this.updateProfile}
                />
                <ProfileAddCourse
                    isVisible={this.state.showProfileAddCourse}
                    onCancel={() => this.setState({ showProfileAddCourse: false })}
                    onSave={this.addCourse}
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
                {this.state.loading
                    && <ActivityIndicator color={commonStyles.colors.primary} size={50} style={{ marginTop: 150 }} />
                    ||
                    <View style={styles.app}>

                        {/* <View style={styles.editComp}>
                            <View style={styles.editFields}>
                                <Text style={styles.editLabel}>Nome</Text>
                                <TextInput style={styles.editInput}
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name} editable={this.state.editName}/>
                            </View>
                            <View style={styles.editButtom}>
                                <TouchableOpacity onPress={() => this.setState({ editName: true })}>
                                    <Icon
                                        name={'pencil'}
                                        size={20} color={commonStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <Text style={styles.label}>Nome</Text>
                        <Text style={styles.input}>{this.state.name}</Text>
                        <Text style={styles.label}>Matrícula</Text>
                        <Text style={styles.input}>{this.state.registration}</Text>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.input}>{this.state.email}</Text>
                        {/* <View style={styles.editComp}>
                            <View style={styles.editFields}>
                                <Text style={styles.editLabel}>Email</Text>
                                <TextInput style={styles.editInput}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email} editable={this.state.editMail}/>
                            </View>
                            <View style={styles.editButtom}>
                                <TouchableOpacity onPress={() => this.setState({ editMail: true })}>
                                    <Icon
                                        name={'pencil'}
                                        size={20} color={commonStyles.colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <View>
                            <Text style={styles.label}>Meus Cursos</Text>
                            <FlatList
                                data={this.state.courses}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) =>
                                    <Text style={styles.courses}>{item.name}</Text>
                                } />
                        </View>
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
                }
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
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 30,
        marginHorizontal: 18,
        color: '#000',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        marginBottom: 10,
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
    }
});