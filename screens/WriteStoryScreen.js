import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    FlatList
} from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context'

var userIsLoggedIn

class WriteStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            StoryTitle: "",
            Author: "",
            story: "",
            userIsLoggedIn:null
        }
    }
    checkStoryExists = async () => {
        if(this.state.StoryTitle==""||this.state.Author==""){
            if(this.state.story.length<10){
                alert('Please try to add some more lines!')
                return false
            }
            alert('StoryTitle||Author||Story Cannot be Empty')
            return false
        }
        const storiesRef = db.collection('Stories');
        const instances = await storiesRef.where('StoryTitle', '==', this.state.StoryTitle).get();
        console.log(instances.docs)
        var isCopy=false
        instances.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            isCopy=doc.data()
          });
          isCopy=isCopy==null

        if (isCopy==false) {
            alert("Story Title is already taken")
        }
        console.log(isCopy)
        return isCopy;

    }
    componentDidMount=()=>{
        this.checkLoggedIn()
    }
    checkLoggedIn=async()=>{
        var user =await firebase.auth().currentUser
        var _userIsLoggedIn= user!=null
        this.setState({
            userIsLoggedIn:_userIsLoggedIn
        })
        console.table(this.state.userIsLoggedIn,_userIsLoggedIn,user)
    }
    submitStory = async () => {
        console.log(this.state.userIsLoggedIn)
        if (this.checkStoryExists()===true) {
            const res = await db.collection('Stories').add({
                StoryTitle: this.state.StoryTitle,
                Author: this.state.Author,
                story: this.state.story,
            });

            console.log('Added document with ID: ', res.id);
            alert("Story Subbmitted Sucessfully.")
        }
    }
    render() {
        return (
            <View >
                <SafeAreaProvider>
                <Header
                    backgroundColor={'#39B39C'}
                    centerComponent={{
                        text: 'Write Your Story',
                        style: { color: '#fff', fontSize: 20 },
                    }}
                />
                </SafeAreaProvider>
                <KeyboardAvoidingView style={styles.container}>
                    <TextInput
                        style={[styles.inputBox,{borderColor:this.state.StoryTitle.length<2?'#fc8585':'#aaaaaa'}]}
                        onChangeText={(text) => {
                            this.setState({ StoryTitle: text });
                        }}
                        value={this.state.StoryTitle}
                        placeholder="Story Title"
                    />
                    <TextInput
                        style={[styles.inputBox,{borderColor:this.state.Author.length<2?'#fc8585':'#aaaaaa'}]}
                        onChangeText={(text) => {
                            this.setState({ Author: text });
                        }}
                        value={this.state.Author}
                        placeholder="Author"
                    />
                    <TextInput
                        style={[styles.inputBox, { height: 200 ,
                            borderColor:this.state.story.length<10?'#fc8585':'#aaaaaa'
                        }]}
                        onChangeText={(text) => {
                            this.setState({ story: text });
                        }}
                        value={this.state.story}
                        placeholder="Write Your Story here "
                        multiline={true}
                    />
                    <TouchableOpacity style={[styles.button,{backgroundColor:this.state.userIsLoggedIn?'#ffca4f':'#aaaaaa'}]}
                        onPress={this.submitStory}
                        disabled={this.state.userIsLoggedIn?false:true}
                    >
                        <Text>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LogInScreen')}>
                    <Text style={{color:'#FF4B4B'}}>
                        {this.state.userIsLoggedIn?'':'Please Log In To Write Stories'}{
                        }
                    </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default WriteStoryScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        height: 40,
        borderWidth: 3,
        borderColor: "#aaaaaa"
    },
    button: {
        backgroundColor: '#FFCA4F',
        paddingHorizontal: 20,
        margin: 20,
        paddingVertical: 10,
        borderRadius: 5,

    }
});