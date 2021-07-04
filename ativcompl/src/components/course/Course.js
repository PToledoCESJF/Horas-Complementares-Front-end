import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../../commonStyles'

export default props => {

    const [toggleSelected, setToggleSelected] = useState(false)
    const [coursesSelected, setCoursesSelected] = useState([])

    useEffect(() => {
        
        setCoursesSelected(props.id)
    }, [setCoursesSelected])

    function getCheckView(selected) {
        if (selected) {
            return (
                <View style={styles.done}>
                    <Icon name='check' size={18} color='#FFF'></Icon>
                </View>
            )
        } else {
            return (
                <View style={styles.pending}></View>
            )
        }
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPress={() => setToggleSelected(!toggleSelected)}
            >
                <View style={styles.checkContainer}>
                    <Text style={styles.textBody}>{props.name}</Text>
                    {getCheckView(props.selected)}<Text style={styles.textBody}></Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        borderColor: '#AAA',
        borderWidth: 3,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: commonStyles.colors.secondary
    },
    checkContainer: {
        width: '120%',
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    textBody: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.tertiary,
        fontSize: 18
    },
    pending: {
        height: 22,
        width: 22,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 22,
        width: 22,
        borderRadius: 13,
        backgroundColor: '#009bd9',
        alignItems: 'center',
        justifyContent: 'center'
    },
})