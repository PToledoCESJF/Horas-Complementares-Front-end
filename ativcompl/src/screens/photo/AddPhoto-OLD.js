// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { addPost } from '../store/actions/posts'
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     TextInput,
//     Image,
//     Dimensions,
//     Platform,
//     ScrollView,
//     Alert
// } from 'react-native'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

// const noUser = 'Você precisa estar logado para adicionar imagens'

// export default class AddPhoto extends Component {

//     state = {
//         imageUri: '',
//         imageUriGallery: '',
//     }

//     // componentDidUpdate = prevProps => {
//     //     if (prevProps.loading && !this.props.loading) {
//     //         this.setState({
//     //             image: null,
//     //             comment: ''
//     //         })
//     //         this.props.navigation.navigate('Feed')
//     //     }
//     // }

//     pickImage = () => {
//         // if (!this.props.name) {
//         //     Alert.alert('Falha!', noUser)
//         //     return
//         // }

//         // ImagePicker.showImagePicker({
//         //     title: 'Escolha a imagem',
//         //     maxHeight: 600,
//         //     maxWidth: 800
//         // }, res => {
//         //     if (!res.didCancel) {
//         //         this.setState({ image: { uri: res.uri, base64: res.data } })
//         //     }
//         // })

//         const options = {
//             storageOptions: {
//                 path: 'images',
//                 mediaType: 'photo',
//             },
//             includeBase64: true,
//         };

//         launchCamera(options, response => {
//             console.log('Response = ', response);
//             if (response.didCancel) {
//                 console.log('User cancelled image picker')
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 // You can also display the image using data:
//                 const source = { uri: `data: image / jpeg; base64, ${response.base64}`
//             };
//             this.setState({ imageUri: source });
//         }
// });
//     }

//     save = async () => {
//         // if (!this.props.name) {
//         //     Alert.alert('Falha!', noUser)
//         //     return
//         // }

//         // this.props.onAddPost({
//         //     id: Math.random(),
//         //     nickname: this.props.name,
//         //     email: this.props.email,
//         //     image: this.state.image,
//         //     comments: [{
//         //         nickname: this.props.name,
//         //         comment: this.state.comment
//         //     }]
//         // })

//         const options = {
//             storageOptions: {
//                 path: 'images',
//                 mediaType: 'photo',
//             },
//             includeBase64: true,
//         };
    
//         launchImageLibrary(options, response => {
//             console.log('Response = ', response);
//             if (response.didCancel) {
//                 console.log('User cancelled image picker')
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 // You can also display the image using data:
//                 const source = { uri: `data: image / jpeg; base64, ${response.base64}`
//             };
//             this.setState({ imageUriGallery: source });
//         }
//     });
//     }

//     render() {
//         return (
//             <ScrollView>
//                 <View style={styles.container}>
//                     <Text style={styles.title}>Compartilhe uma imagem</Text>
//                     <View style={styles.imageContainer}>
//                         <Image source={this.state.imageUri}
//                             style={styles.image} />
//                     </View>
//                     <TouchableOpacity onPress={this.pickImage}
//                         style={styles.buttom}>
//                         <Text style={styles.buttomText}>Escolha a foto</Text>
//                     </TouchableOpacity>
//                     <TextInput placeholder='Algum comentÃ¡rio para a foto?'
//                         style={styles.input} value={this.state.comment}
//                         editable={this.props.name != null}
//                         onChangeText={comment => this.setState({ comment })} />
//                     <TouchableOpacity onPress={this.save}
//                         disabled={this.props.loading}
//                         style={[styles.buttom, this.props.loading ? styles.buttonDisabled : null]}>
//                         <Text style={styles.buttomText}>Salvar</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         )
//     }
// }

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


// // const mapStateToProps = ({ user, posts }) => {
// //     return {
// //         email: user.email,
// //         name: user.name,
// //         loading: posts.isUploading
// //     }
// // }

// // const mapDispatchToProps = dispatch => {
// //     return {
// //         onAddPost: post => dispatch(addPost(post))
// //     }
// // }

// // export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)