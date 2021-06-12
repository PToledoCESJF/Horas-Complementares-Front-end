import React, { Component } from 'react'
import { 
    View, 
    ImageBackground, 
    StyleSheet, 
    SafeAreaView, 
    FlatList,
    TouchableOpacity, 
    Platform
 } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Activity from './components/activity/Activity'
import topImage from '../assets/imgs/topImage.png'
import commonStyles from './commonStyles'

export default class App extends Component {
    state = {
        showDoneActivity: true,
        visibleActivities: [], 
        activities: [{
            id: Math.random(),
            name: "Atividade 1",
            start: new Date(),
            workload: 15,
            hours_completed: 10,
        }, {
            id: Math.random(),
            name: "Atividade 2",
            start: new Date(),
            workload: 10,
            hours_completed: 10,
            closed: true
        }, {
            id: Math.random(),
            name: "Atividade 3",
            start: new Date(),
            workload: 15,
            hours_completed: 9,
        }]
    }

    componentDidMount = () => {
        this.filterActivity()
    }

    toggleFilter = () => {
        this.setState({ showDoneActivity: !this.state.showDoneActivity }, this.filterActivity)
    }

    filterActivity = () => {
        let visibleActivities = null
        if(this.state.showDoneActivity){
            visibleActivities = [...this.state.activities]
        } else {
            const pending = activity => activity.closed === null
            visibleActivities = this.state.activities.filter(pending)
        }
        this.setState({ visibleActivities })
    }

    toggleActivity = activityId => {
        const activities = [...this.state.activities]
        activities.forEach(activity => {
            if(activity.id === activityId){
                activity.closed = activity.closed ? null : true
            }
        })
        this.setState({ activities }, this.filterActivity)
    }

    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={topImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon 
                                name={this.state.showDoneActivity ? 'eye' : 'eye-slash'} 
                                size={20} color={commonStyles.colors.primary}
                            />
                        </TouchableOpacity>

                    </View>

                </ImageBackground>
                <View style={styles.app}>
                    <FlatList 
                        data={this.state.visibleActivities}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Activity {...item} toggleActivity={this.toggleActivity} />}
                    />
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
        flex: 3
    },
    app: {
        flex: 7, 
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    }
});