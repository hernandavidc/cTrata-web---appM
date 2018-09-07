import React, { Component } from 'react'
import { Text, View ,StatusBar, Platform, Dimensions, StyleSheet, ScrollView} from 'react-native'

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class componentName extends Component {

  constructor (props) {
    super(props)
    // por defecto (aunque defberian ser de la db), las recomendaciones a mostrar segun el indiciador que vamos a recibir
    //type: this.props.navigation.state.params.indicador recibimos el indiciador y se lo asigna a la variable type
  this.state = {
      verde:{
        
          "1": "Recuerde la importancia de realizar un viaje seguro: tener a la mano los documentos de identidad, conocer los números de contacto de las autoridades, notificar ante cualquier autoridad algo que considere lo puede poner en riesgo.",
          "2": "Mantenga comunicación constante con sus familiares o personas de confianza para que sepan de su estado de salud y sus condiciones. ",
          "3": "La línea nacional de atención 018000522020 o la línea 122 son los medios establecidos por el Gobierno Nacional para que reportar cualquier situación riesgosa o un caso de trata de personas.",
          "4": "Recuerde que cualquier persona puede ser víctima de trata."      
      },
      amarillo:{
        "1": "Por precaución memorice el teléfono y la dirección de la embajada o del consulado de su país más cercano al lugar donde se supone que va a visitar o vivir. Si no hay una cerca, busque la embajada de un país que hable su mismo idioma.",
        "2": "Si viaja obligada, amenazada o se da cuenta de algún engaño durante el viaje, aproveche los aeropuertos o los puertos marítimos para escapar o pedir ayuda. Lo puede hacer aquí en el país, en el de tránsito (por donde pasa) o de llegada. Haga lo que sea por escapar de forma silenciosa o si las circunstancias lo permiten intente hablar con la policía de inmigración o con azafatas, escriba en una mano “ayuda” y muéstrela, o finga un desmayo. Lo importante es que llame la atención y pueda hablar. Si la o las personas que le quieren hacer daño están con usted en el momento que pida ayuda, grite o explique que no la dejen sola con ellos. Una vez empieces a pedir ayuda no deje de hacerlo, pues si cede antes las amenazas o el miedo su vida puede correr peligro. ",
        "3": "Si va a un país en donde desconoce el idioma o donde la forma de escribir es diferente a la suya, memorice palabras en inglés o en el idioma local y llévelas escritas, por ejemplo: miedo (fear), ayuda (help), secuestro (kidnapping), trata de personas (trafficking in human being).",
        "4": "Le aconsejamos que haga fotocopias o fotos a sus documentos (pasaporte, documento de identidad, billete o pasaje de viaje) y si puede, saca una foto a la persona que le esta “ayudando” a viajar, si es el caso. Envíalas a su propio email y para evitar sospechas por si abren su correo, escribe una oración o un poema largo y al final escriba datos importantes como los nombres de las personas con las que habló y las direcciones de donde se reunía con ellos y del lugar a donde va a llegar. Entrégale o envíale fotocopias de esos documentos a alguien de confianza."
    },
    red:{
      "1": "Le aconsejamos que haga fotocopias o fotos a sus documentos (pasaporte, documento de identidad, billete o pasaje de viaje) y si puede, saca una foto a la persona que le esta “ayudando” a viajar, si es el caso. Envíalas a su propio email y para evitar sospechas por si abren su correo, escribe una oración o un poema largo y al final escriba datos importantes como los nombres de las personas con las que habló y las direcciones de donde se reunía con ellos y del lugar a donde va a llegar. Entrégale o envíale fotocopias de esos documentos a alguien de confianza.",
      "2": "Si viaja obligada, amenazada o se da cuenta de algún engaño durante el viaje, aproveche los aeropuertos o los puertos marítimos para escapar o pedir ayuda. Lo puede hacer aquí en el país, en el de tránsito (por donde pasa) o de llegada. Haga lo que sea por escapar de forma silenciosa o si las circunstancias lo permiten intente hablar con la policía de inmigración o con azafatas, escriba en una mano “ayuda” y muéstrela, o finja un desmayo. Lo importante es que llame la atención y pueda hablar. Si la o las personas que le quieren hacer daño están con usted en el momento que pida ayuda, grite o explique que no la dejen sola con ellos. Una vez empieces a pedir ayuda no deje de hacerlo, pues si cede antes las amenazas o el miedo su vida puede correr peligro.",
      "3": "Escribe en un papel pequeño direcciones y teléfonos para pedir ayuda. Fórrelo con un plástico para que no se borre ni se rompa. Escóndalo dentro de la ropa con la que piensas viajar. No olvide llevar monedas del lugar para poder hacer llamadas. Además, Por precaución memorice el teléfono y la dirección de la embajada o del consulado de su país más cercano al lugar donde se supone que va a visitar o vivir. Si no hay una cerca, busque la embajada de un país que hable su mismo idioma.",
      "4": "Usted tiene un alto riesgo de ser víctima de trata de personas. Este es un delito que busca explotar a las personas de diferentes formas: explotación sexual, laboral, servidumbre, matrimonio servil y en general prácticas de esclavitud. Puede volver a pensar y reconsiderar la decisión que quiere tomar. Las autoridades colombianas están dispuestas a brindarle todas las garantías posibles para que sus derechos no sean vulnerados."
    },
      type: this.props.navigation.state.params.indicador
    }
    
  }
  getRecomendationInfo(){
// hace la validacion para ver cual color mostrar, y luego se recorre un array o un json, como un .map para poder retornar
// y que se creen las vistas, despues que termina el array
// lo retorna esa variable para que la renderise abajo
    let val = this.state.type == '1' ? this.state.verde: this.state.type == '2' ? this.state.amarillo:this.state.red
    let rending = Object.keys(val).map((key, index) => {
      // aca recibio un item tipo
      // "1": "Recuerde la importancia de realizar un viaje seguro: tener a la mano los documentos de identidad, conocer los números de contacto de las autoridades, notificar ante cualquier autoridad algo que considere lo puede poner en riesgo.",
      // donde key es la pregunta*
      // las hice al reves xD pero bueno
    // listo eso es all
      return (<View key={key} style={{width:SCREEN_WIDTH*0.9, 
      flexDirection:'row', alignSelf:'flex-start', marginBottom: 12}}>
      <Text style={{fontSize:16,fontWeight:'bold', paddingHorizontal:10}}> 
        {key})
       </Text>
      <Text style={{fontSize:16,textAlign:'justify'}}>
       
       {val[key]}
        </Text></View>)
   });
   return rending;
  }
  render() {
    // css y html
    //y hace la rederizada de la informacion
    // con el metodo 
    return (
      <View style={{flex:1}}>
        <MyStatusBar backgroundColor="#2B94B2" barStyle="light-content" />
        
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={{width:80, height:80, borderRadius:110, alignSelf:'center', marginBottom:10,
          backgroundColor: this.state.type == '1' ? 'green': this.state.type == '2' ? 'yellow': 'red'
          }}/>
        <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center'}}>RECOMENDACIONES</Text>
        <ScrollView> 
          {this.getRecomendationInfo()}
          </ScrollView>
        </View>
      </View>
    )
  }
  
}
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT
  }
});