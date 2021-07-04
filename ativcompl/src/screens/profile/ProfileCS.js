import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Text,
    ActivityIndicator,
    FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { Avatar } from "react-native-elements"
import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'
import Header from '../../components/header/Header'
import ProfileAddCourse from './ProfileAddCourse'

const initialState = {
    name: '',
    registration: '',
    email: '',
    uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
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
                const profile = profiles.shift()
                this.setState(profile)
                this.setState({ uri: profile.avatar && profile.avatar })
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
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ProfileAddCourse
                    isVisible={this.state.showProfileAddCourse}
                    onCancel={() => this.setState({ showProfileAddCourse: false })}
                    onSave={this.addCourse}
                />
                <Header title='Perfil' />
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
                            size={20} color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                            name={'bell-o'}
                            size={20} color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
                {this.state.loading
                    && <ActivityIndicator color={commonStyles.colors.primary} size={50} style={{ marginTop: 150 }} />
                    ||
                    <View style={styles.app}>
                        <View style={styles.dataProfile}>
                            <View style={styles.dataAvatar}>
                                <Avatar
                                    style={styles.avatar}
                                    size="large"
                                    rounded
                                    source={{
                                        uri: this.state.uri,
                                    }}
                                />
                            </View>
                            <View style={styles.datas}>
                                <Text style={styles.input}>{this.state.name}</Text>
                                <Text style={styles.input}>
                                <Text style={styles.label}>Matrícula: </Text>
                                    {this.state.registration}
                                </Text>
                                <Text style={styles.input}>{this.state.email}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.label}>Meus Cursos</Text>
                            <FlatList
                                data={this.state.courses}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) =>
                                    <Text style={styles.courses}>{item.name}</Text>
                                } />
                        </View>
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyles.colors.secondary,
    },
    background: {
        flex: 2
    },
    app: {
        flex: 8,
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
    dataProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    dataAvatar: {
        width: '25%',
    },
    datas: {
        width: '75%',
        marginTop: 10
    },
    avatar: {
        width: 80,
        height: 80,
        borderWidth: 3,
        borderRadius: 40,
        margin: 10,
        borderColor: commonStyles.colors.primaryTransparency
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
        fontSize: 16,
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
        height: 20,
        marginHorizontal: 18,
        color: '#000',
        fontSize: 14,
        // backgroundColor: '#FFF',
        // borderBottomWidth: 1,
        // borderColor: '#A9A9A9',
        marginBottom: 5,
    },
    label: {
        fontFamily: commonStyles.fontFamily,
        height: 20,
        marginHorizontal: 18,
        color: commonStyles.colors.primary,
        // borderColor: '#A9A9A9',
        // backgroundColor: '#FFF',
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
});