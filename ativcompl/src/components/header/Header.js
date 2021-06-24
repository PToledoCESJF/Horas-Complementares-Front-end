import React from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Text
} from 'react-native'

import topPage from '../../../assets/imgs/top_page_white.png'
import commonStyles from '../../commonStyles'

export default Header = ({ title }) => {


    return (
        <ImageBackground source={topPage}
            style={styles.background}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 2
    },
    app: {
        flex: 8,
        marginTop: 20
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
});