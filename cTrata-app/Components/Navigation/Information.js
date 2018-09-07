import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { Content, Container, Card, CardItem, Thumbnail } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
// esto es para las dimensiones del celuco y que todo se vea segun eso
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class componentName extends Component {
  render() {
    return (
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4 }}>
            <View style={{ width: SCREEN_WIDTH * 0.9, height: '80%', backgroundColor: 'rgba(204,204,204,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Información <Text style={{ fontWeight: 'bold', fontSize: 20 }}>de contacto para migración Colombia</Text></Text>
                <Thumbnail large
                    source={{ uri: 'https://static.giantbomb.com/uploads/square_medium/0/2464/2514455-batman_avatar-e1263852269689.jpg' }}
                ></Thumbnail>
            </View>
        </View>
      </View>
    )
  }
}