import React from "react";
import { StyleSheet, Text, View, StatusBar, Platform} from "react-native";
import { Font, Expo } from "expo";
import Login from "./Components/Sesion/Login";
import Home from './Components/Navigation/Home';
import Survey from './Components/Navigation/Survey';
import Information from './Components/Navigation/Information';
import Recomendation from './Components/Navigation/Recomendation';
import {Ionicons} from 'react-native-vector-icons';
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class App extends React.Component {
  constructor() {
    super();

    // el navigation options, simplemente es para saber y definir el icono en este caso según la vista, ahi esta los condicionales
    // y que asigne el icono segun el que sea, y retorne el icono
    // el initial route name, es para definir cuando se abra la app, que vista mostrar primero
    // si luego del login pasa a otra como una de tab, definir cual muestra primero de las que hay en el tab navigation
    this.state = {
      isReady: false,
      isLoad: false,
      initialRouteName: {},
      navigationOptions: {
        initialRouteName:'Inicio',
        navigationOptions:({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Inicio') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
          } else if (routeName === 'Encuesta') {
            iconName =  `ios-book${focused ? '' : '-outline'}`;
          } else if (routeName === 'Informacion'){
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          }
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
       
      }),},
      
    };
  }

  async componentDidMount() {
    await Font.loadAsync(
      {
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Entypo: require("native-base/Fonts/Entypo.ttf")
      }    
    );
    this.setState({ isLoad: true }, ()=>{this.validacionLogin();});
  }

  validacionLogin() {
    console.log('yep')
    //SE CARGARON LAS FUENTES?
    if (this.state.isLoad) {
      //SE CARGARON LAS FUENTES
      // YA ESTABA LOGEADO?
      if (this.state.isReady) {
        // SIKS, ENTONCES MUESTRE LA VISTA DE TABS
        this.setState(
          {
            initialRouteName: {
              initialRouteName: "Tabs",
              headerMode: "none"
            }
          
          },
        
          () => {
            this.setState({ isReady: true });
          }
        );
      } else {
        // NOKS, MUESTRE EL LOGIN
        console.log("entro");
        this.setState(
          {
            initialRouteName: {
              initialRouteName: "Login",
              headerMode: "none"  
            }
          },
          () => {
            
          }
        );
      }
    } else {
      //SI NO SE HAN CARGADO LAS FONTS, MUESTRE UN DEFAULT DE CARGA
      console.disableYellowBox = true;
      return <Expo.AppLoading />;
    }
  }

  render() {
    // DEFINO EL CUERPO DE LAS NAVEGACIONES
    // EL SCREEN HACE REFERENCIA A LA VISTA QUE DEBE REDERIZAR Y SE HA IMPORTADO ARRIBA DEL DOCUMENTO,
    /// EJ: import Login from './Components/Sesion/Login'
    // asi con las otras
    // el primer parametro es el nombre que llevaría la vista en caso de que tenga titulo o sea por tabs
    let bodyNavigation = {
      Login: {
        screen: Login
      },
      Tabs: {
        screen: createBottomTabNavigator({
          Inicio: Home,
          Encuesta: createStackNavigator({
            HomeEncuesta:{
              screen:Survey
            },
            Recomendacion:{
              screen: Recomendation
            }
          },{
            initialRouteName:'HomeEncuesta',
            headerMode:'none'
          }),
          Informacion: Information
          
        },
        
        
        this.state.navigationOptions,
        )
      }
    };

    //esto es para definir el navegador, le pasa el body de arriba, y la ruta inicial del inicio
    let RootStack = createStackNavigator(
      bodyNavigation,
      this.state.initialRouteName,
      
    );
    // lo retorna para que lo grafique
    // lo del status bar es para que sea la barra de donde salen notificaciones de wap y eso, de otro color
  
    return <RootStack screenProps={this.state.infoUser}>
    <MyStatusBar backgroundColor="#2B94B2" barStyle="light-content" />
    </RootStack>;
  }
}
// estas constantes son para que el status bar salga bien alineado
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
    const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


    // variables para asignarle a los elementos, ya sea view, text, etc.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
});
