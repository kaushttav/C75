import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { Header, Icon } from 'react-native-elements'
import * as firebase from 'firebase'
import('firebase/auth');
import db from '../config'
export default class LogInScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            input_email: '',
            input_password: ''
        }
    }
    LogIn = async (email, password) => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.props.navigation.navigate('Home')
            })
            .catch((error) => {
                var errorcode = error.code;
                var errormessege = error.message;
                console.log(error)
                return alert(errormessege)
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{
                    height: 150,
                    width: 150,
                    borderRadius:20,
                    borderWidth:5,
                    borderColor:'#aaaaaa',
                    resizeMode:'contain',
                    margin:10,
                }}
                    source={require('../assets/images.png')}
                />
                <Text style={styles.heading}>
                    Bed Time Stories
                </Text>
                <TextInput
                    style={[styles.inputBox,{borderColor:this.state.input_email.length<2?'#fc8585':'#aaaaaa'}]}
                    onChangeText={(text) => {
                        this.setState({ input_email: text });
                    }}
                    value={this.state.input_email}
                    placeholder="Email"
                    keyboardType='email-address'
                />
                <TextInput
                        style={[styles.inputBox,{borderColor:this.state.input_password.length<2?'#fc8585':'#aaaaaa'}]}
                        onChangeText={(text) => {
                        this.setState({ input_password: text });
                    }}
                    value={this.state.input_password}
                    placeholder="Password"
                    keyboardType='visible-password'
                    secureTextEntry
                />
                <View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this.LogIn(this.state.input_email, this.state.input_password) }}
                        disabled={this.state.input_email.length<4&&this.state.input_password.length<2}
                        >
                        <Text style={styles.buttonText}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Text>
                            Continue as guest
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 50
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        paddingBottom:50
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputBox: {
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        paddingLeft: 10,
        borderWidth: 3,
        borderColor: "#cccccc",
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#FFCA4F',
        padding: 10,
        margin: 20,
        borderRadius: 5,

    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600'
    }
});