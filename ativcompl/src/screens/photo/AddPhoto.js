import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//   import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';

export default class AddPhoto extends Component {

    state = {
        image: 'https://api.adorable.io/avatars/80/abott@adorable.png'
    }

    takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            this.setState({ image: image.path });
            // this.bs.current.snapTo(1);
        });
    }

    choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            this.setState({ image: image.path });
            // this.bs.current.snapTo(1);
        });
    }

    render() {
        return (
            <View style={styles.panel}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.panelTitle}>Upload Photo</Text>
                    <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                </View>
                <TouchableOpacity style={styles.panelButton} onPress={this.takePhotoFromCamera}>
                    <Text style={styles.panelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={this.choosePhotoFromLibrary}>
                    <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.panelButton}
                    onPress={() => this.bs.current.snapTo(1)}>
                    <Text style={styles.panelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
            </View>

            // <ScrollView>
            //     <View style={styles.container}>
            //         <Text style={styles.title}>Compartilhe uma imagem</Text>
            //         <View style={styles.imageContainer}>
            //             <Image source={this.state.imageUri}
            //                 style={styles.image} />
            //         </View>
            //         <TouchableOpacity onPress={this.pickImage}
            //             style={styles.buttom}>
            //             <Text style={styles.buttomText}>Escolha a foto</Text>
            //         </TouchableOpacity>
            //         <TextInput placeholder='Algum comentÃ¡rio para a foto?'
            //             style={styles.input} value={this.state.comment}
            //             editable={this.props.name != null}
            //             onChangeText={comment => this.setState({ comment })} />
            //         <TouchableOpacity onPress={this.save}
            //             disabled={this.props.loading}
            //             style={[styles.buttom, this.props.loading ? styles.buttonDisabled : null]}>
            //             <Text style={styles.buttomText}>Salvar</Text>
            //         </TouchableOpacity>
            //     </View>
            // </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center'
//     },
//     title: {
//         fontSize: 20,
//         marginTop: Platform.OS === 'ios' ? 30 : 10,
//         fontWeight: 'bold'
//     },
//     imageContainer: {
//         width: '90%',
//         height: Dimensions.get('window').width / 2,
//         backgroundColor: '#EEE',
//         marginTop: 10
//     },
//     image: {
//         width: '100%',
//         height: Dimensions.get('window').width / 2,
//         resizeMode: 'center'
//     },
//     buttom: {
//         marginTop: 30,
//         padding: 10,
//         backgroundColor: '#4286f4'
//     },
//     buttomText: {
//         fontSize: 20,
//         color: '#FFF'
//     },
//     input: {
//         marginTop: 20,
//         width: '90%'
//     },
//     buttonDisabled: {
//         backgroundColor: '#AAA'
//     }
// })
