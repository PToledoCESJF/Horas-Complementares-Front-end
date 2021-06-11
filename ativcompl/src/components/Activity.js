import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'

import topImage from '../../../assets/imgs/topImage.png'

export default props => {

    const getActivetyItem = ({ item: activity }) => {
        return (
            <ListItem key={activity.id}
                bottomDivider
                onPress={() => props.navigation.navigate('ActivityForm', activity)}
            >
                {/* <Avatar source={{ uri: user.avatarUrl }} /> */}
                <ListItem.Content>
                    <ListItem.Title>{activity.name}</ListItem.Title>
                    <ListItem.Subtitle>{activity.workload}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={activity => activity.id.toString()}
                data={props.activity}
                renderItem={getActivetyItem}
            />
        </View>
    )
}

