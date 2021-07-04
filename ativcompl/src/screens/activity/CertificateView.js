import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview'

import commonStyles from '../../commonStyles';

export default CertificateView = () => {

    const [url, setUrl] = useState('')
    const [go, setGo] = useState(false)

    if (!go) {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.text}
                    onChangeText={text => setUrl(text)}
                    value={url}
                />
                <View style={{ margin: 5 }}>
                    <Button
                        onPress={() => setGo(true)}
                        title="GO"
                    />
                </View>
            </View>
        )
    } else {
        return(
            <WebView
                source={{ uri: url }}
                style={{ marginTop: 20 }}
            >

            </WebView>
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
        marginTop: 20,
        paddingBottom: 60
    },
    iconBar: {
        backgroundColor: commonStyles.colors.primary,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 5
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