import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'

import { ActivityType } from '../../util/types'

interface Props {
    props: ActivityType;
}
const Activity: React.FC<Props> = ({ props }) => {

    const [activities, setActivities] = useState<ActivityType[]>([])


    useEffect(() => {
        const activitiesList: ActivityType[] = []
        activitiesList.push(props)
        setActivities(a => a = activitiesList)
    }, [setActivities])

    /**
     * id: number;
    certificate: string;
    closed: boolean;
    hours_completed: number;
    name: string;
    start: Date;
    workload: number;
    category_id: number;
    stydenty_id: number;
}
     */

    return (
        <View>
            { activities.map((activity, id) =>
                <ListItem key={id}
                    bottomDivider
                // onPress={() => props.navigation.navigate('UserForm', user)}
                >
                    <ListItem.Content>
                        <ListItem.Title>{activity.name}</ListItem.Title>
                        <ListItem.Subtitle>{activity.workload}</ListItem.Subtitle>
                    </ListItem.Content>
                    {/* <Button
                        onPress={() => props.navigation.navigate('UserForm', user)}
                        type="clear"
                        icon={<Icon name="edit" size={25} color="orange" />}
                    />
                    <Button
                        onPress={() => confirmUserDelection(user)}
                        type="clear"
                        icon={<Icon name="delete" size={25} color="red" />}
                    /> */}

                </ListItem>
            )}
        </View>
    )
}

export default Activity


