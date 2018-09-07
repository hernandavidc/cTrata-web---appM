import React, { Component } from "react";
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    Platform,
    StatusBar,
    TextInput,
    StyleSheet,
    Image
} from "react-native";
import { Content, Container, Card, CardItem, Thumbnail } from "native-base";
import { Input, Button, Avatar } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
// esto es para las dimensiones del celuco y que todo se vea segun eso
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// donde se renderiza el status bar de notificaciones del celuco
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
export default class LOGIN extends Component {
    constructor(props) {
        super(props)
        // variables que pueden modificarse y es necesario que se vea el cambio en la vista
        this.state = {
            userName: 'Hernan Alvarez'
        }
    }
    render() {
    //metodo render,de la vista
    // es puro html y css mas o menos
        return (
            <View style={{ flex: 1 }}>
                <MyStatusBar backgroundColor="#2B94B2" barStyle="light-content" />
                <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4 }}>
                        <View style={{ width: SCREEN_WIDTH * 0.9, height: '80%', backgroundColor: 'rgba(204,204,204,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Bievenido <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.userName}</Text></Text>
                            <Thumbnail large
                                source={{ uri: 'https://static.giantbomb.com/uploads/square_medium/0/2464/2514455-batman_avatar-e1263852269689.jpg' }}
                            ></Thumbnail>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: SCREEN_WIDTH * 0.85 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                País: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>Colombia</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Ciudad: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>Bogota</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Bio: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>Aeropuerto el Dorado</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Tipo: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>Control Migratorio</Text>
                            </Text>

                        </View>
                    </View>


                </View>
            </View>)
    }


}
// las constatnes de la status bar
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// y estilos que puede definir aca para reutilizarlos o los define en cada uno por separado
const styles = StyleSheet.create({

    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: '#79B45D',
        height: APPBAR_HEIGHT,
    },
});