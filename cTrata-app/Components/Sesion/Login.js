import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  StyleSheet
} from "react-native";
import { Content, Container, Card, CardItem } from "native-base";
import { Input, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from 'react-navigation';
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class LOGIN extends Component {
    constructor(){
        super();
        this.state = {
            email:'1098800250',
            password:'ctrata',
            showLoading: false
        }
    }

    requestLogin() {
        this.setState({ showLoading: !this.state.showLoading});
        setTimeout(()=>{
            if(this.state.email === '1098800250'){
                if(this.state.password === 'ctrata'){
                    this.setState({showLoading: !this.state.showLoading})
                    console.log('yah')
                    this.props.navigation.navigate('Tabs');
                }
            }
        },1500)
        
    }
  render() {
    const {email,password} = this.state;
    return (
      <View style={{ flex: 1 }}>
      <MyStatusBar backgroundColor="#2B94B2" barStyle="light-content" />
        <ImageBackground
          source={require("../../Assets/cs.png")}
          style={{ flex: 1, alignContent: "center", justifyContent: "center"}}
        >
        
          <View
            style={{
              flex: 0.6,
              backgroundColor: "white",
              marginHorizontal: SCREEN_WIDTH * 0.06,
              borderRadius: 10
            }}
          >
            <View style={{flex:0.65,justifyContent:'center', alignItems:'center', marginTop:15}}>
              <ImageBackground
                style={{ width: "100%", height: "100%"}}
                source={require("../../Assets/logo.png")}
                resizeMode="contain"
        
              />
              
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text
                  style={{ color: "black", fontSize: 25, fontWeight:'bold' }}
                >
                  {" "}
                  CTrata{" "}
              </Text>
            </View>

            <View style={{width:'40%',height:0.7, backgroundColor:'rgba(204,204,204,1)', marginTop:20,alignSelf:'center'}}></View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:15}}>
              
                <Input
                  placeholder='Email'
                  value={email}
                  onChangeText={email =>{this.setState({email})}}
                  keyboardType="email-address"
                  spellCheck={false}
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  onSubmitEditing={()=>{
                      this.passwordInput.focus();
                  }}
                />
              
              
                <Input
                  autoCapitalize="none"
                  placeholder='Password'
                  value={password}
                  spellCheck = {false}
                  onChangeText={password =>{this.setState({password})}}
                  autoCorrect={false}
                  returnKeyType="done"
                  secureTextEntry={true}
                  keyboardType="default"
                  ref={input => this.passwordInput = input}
                  blurOnSubmit={true}
                  onSubmitEditing={()=>{
                      this.requestLogin()
                  }}
                />
              
            </View>
            <View style={{marginTop:30, marginHorizontal:18}}>
              <Button title='LOGIN' 
              buttonStyle={{backgroundColor:'#4ABEEB'}} 
              onPress={()=>{this.requestLogin()}} loading={this.state.showLoading}/>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
    
  }
  
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
    const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const styles = StyleSheet.create({

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
});