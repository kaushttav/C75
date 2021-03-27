import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReadStoryScreen from './screens/ReadStoryScreen';
import WriteStoryScreen from './screens/WriteStoryScreen';
import LogInScreen from './screens/LogInScreen'

class App extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Read: {screen:ReadStoryScreen},
  Write: {screen: WriteStoryScreen},
 
 
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName === "Read"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:40, height:40}}
        />
        )

      }
      else if(routeName === "Write"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:40, height:40}}
        />)

      }
    }
  })
}
);

var SwitchNavigator = createSwitchNavigator({
  LogInScreen:{screen:LogInScreen},
  Home:{screen:TabNavigator},
})
const AppContainer =  createAppContainer(SwitchNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});