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
  Image,
  FlatList,
  Picker,
  ScrollView,
  Alert,
  KeyboardAvoidingView
  
} from "react-native";
import { Content, Container, Card, CardItem, Thumbnail } from "native-base";
import { Input, Button, Avatar, Slider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
// dimensiones del celuco
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
// lo mismo del statusbar
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
  
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />

  </View>
);
export default class componentName extends Component {
    constructor(props){
        super(props);
        // variables con cambio
        // las show, son para saber que vista mostrar dependiendo de donde va el usuario
        // dni para salvar cual ingresa el usario
        // las survey info, es lo que va a mostrar de las preguntas que traiga de la db según el motivo de viaje
        // esta así para acordarme del modelo, osea para recordar como venia de la db la informacion
        // la otra default survey es para por defecto cargar campos
        //las secciones de los diferentes tipos de viaje
        // el scroll enabled es para evitar bug visuales en este caso cuando se mueva un slider
        //donde se salvan las respuestas
        // y el indicador para saber que semaforo mostrar
        this.state = {
            loading:false,
            showDNI: true,
            showSurvey: false,
            showMainSurvey: false,
            dni: '1096',
            surveyInfo: {data:[{key:'¿1+1?',id:0,answers:[1,2,3,4,5]}, 
            {key:'¿2+2?',id:1,answers:[1,2,3,4,5]}, 
            {key:'¿3+3?',id:2,answers:[1,2,3,4,5]},
            {key:'¿4+4?',id:3,answers:[1,2,3,4,5]},
            {key:'¿5+5?',id:4,answers:[1,2,3,4,5]}
            ,{key:'¿6?',id:5,answers:[1,2,3,4,5]}
            ,{key:'¿7?',id:6,answers:[1,2,3,4,5]}
            ,{key:'¿8?',id:7,answers:[1,2,3,4,5]}
            ,{key:'¿9?',id:8,answers:[1,2,3,4,5]}]},
            
            defaultSurveyInfo:
            {data:[{key:'Nombre',id:0}, 
            {key:'Edad',id:1},
            {key:'Lug-ar de Origen',id:2},
            {key:'Estrato Socioeconómico',id:3}
            ,{key:'Lugar de Destino',id:4},
            
            {key:'Motivo del Viaje',id:5}
            

           ],
           sections:[' - Oferta Laboral',' - Turismo',' - Oferta academica',' - Relación sentimental']
            ,rtaSection:'l'},
            
            scrollEnabled: false,
            rtaDefaultAnswers:['','','','',''],
            rtaAnswers: [],
            indicador: 1
           
        }
    }

    displayDNI() {
        // donde se muestra para pedir la cedula
        return <View style={{flex: 1}}>
        <View style={{flex:1,justifyContent:'center' }}>
            <Text style={{fontSize:30, fontWeight:'bold',alignSelf:'center'}}>DNI</Text>
            <View style={{width:SCREEN_WIDTH*0.8,backgroundColor:'white', alignItems:'center',alignSelf:'center', marginTop:15}}>
            <Input placeholder='DNI' value={this.state.dni} 
            onSubmitEditing={()=>

                {
                    // el value, muestra lo que tenga la variable, y eso carga a automaticamente, a medida que es modificada abajo
                    // en el change text, por es otoca usar los "STATES" 
                    
                    // aca cuando envia la cedula ejecuta esa validacion, que es llamar a la db 
                    // el on change text es para estar pendiente cuando la persona modifique el texto de la cedula
                    // la variable tambien cambie
                    // el resto es html y css
                    this._handleDNI()}}
            onChangeText={dni => this.setState({dni})} 
            inputStyle={{width:'100%'}} 
            keyboardType='numeric'></Input>
            </View>
            <View style={{width:SCREEN_WIDTH*0.8, alignSelf:'center', marginTop: 15}}> 
                <Button title='ENVIAR' onPress={()=>{this._handleDNI()}} loading={this.state.loading}></Button>
            </View>
           
            </View> 
        </View>
    }
    componentDidMount(){
        enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });
    }

    displayMainSurvey() {
        //retorno lo que va a redenrizar
        //css y html a lo que mark
        // el flat list, tengo que pasarle la info que va a renderizar
        // data = la info que me debería traer de la db (ESTA DEFINIDO ESTATICO LAS PREGUNTAS DE INFO DE CONTACTO POR DEFECTO ARRIBA)
        // y render, lo que debe mostrar por cada nodo la lista


        // el boton tiene metodo que cuando le den click muestre la siguiente parte de la encuesta
        return <View style={{flex:1}}>
        <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center'}}>ENCUESTA</Text>
            <View style={{flex: 1, justifyContent:'center', alignItems:'center', paddingBottom:20}}>
            <KeyboardAvoidingView behavior="padding" enabled style={{flex:1}}>
            <View style={{width:SCREEN_WIDTH*0.9}}>
            <ScrollView>
            
            <FlatList data={this.state.defaultSurveyInfo.data}
            renderItem={({item}) => this.loadDefaultQuestions(item) }
            style={{marginBottom:15 }}
           />
           <Button title='SIGUIENTE' style={{paddingBottom:20}} onPress={()=>{
                this.handleDisplaySurvey();
           }}></Button>
        
               </ScrollView>
               
            </View>
            
            </KeyboardAvoidingView>
            
            </View>
            
        </View>
    }
    handleDisplaySurvey = () =>{
        // traigo las preguntas que debe mostrar
        this.getQuestions(this.state.defaultSurveyInfo.rtaSection);
        
        
    }
    displaySurvey(){
        // css hy html
        // lo mismo del flatlist
        // el boton de enviar, con metodo para cuando lop resionen
        return <View style={{flex:1}}>
        <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center'}}>ENCUESTA</Text>
        <View style={{flex: 1, marginTop:10}}>
        <ScrollView style={{flex:1}}>
        <View style={{flex:1}}> 
            
           <FlatList data={this.state.surveyInfo.data}
            renderItem={({item}) => 
                this.loadQuestions(item)
                }
            style={{marginBottom:15 }}
           /> 
           </View>
           
           <View style={{width:'90%',alignSelf:'center', marginBottom:15}}>
            <Button title='ENVIAR' loading={this.state.loading} 
            onPress={()=>{this.sendData()}} 
            />
           </View>
           </ScrollView>
        </View>
        
        </View>
    }


    logicaSemaforo () {
       let x =  this.state.defaultSurveyInfo.rtaSection ;
        
       if(x == 'l'){
           console.log('l')
            this.logicaOfertaLaboral();
       }else if (x == 't'){
        console.log('t')
        this.logicaTurismo();
       }else if (x =='a'){
        console.log('a')
        this.logicaRelacionSe();
       }else if (x == 's'){
        console.log('s')
        this.logicaOfertaAcademica();
       }
    }
    logicaOfertaAcademica(){
        let marcador = 0 ;
        
        for(let p = 0 ; p<this.state.rtaAnswers.length; p++){
            if (p == 2){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1

            }else if( p == 3){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else if(p == 5){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else if(p == 6){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else if(p == 8){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else{
                marcador+= Number(this.state.rtaAnswers[p])
            }
        }
        console.log(marcador)
        if(marcador >= 40  ) {this.setState({indicador:1})}
        else if(marcador >= 24) {this.setState({indicador:2})}
        else if(marcador <= 23) {this.setState({indicador:3})}
    }



    logicaRelacionSe(){
        let marcador = 0 ;
        
        for(let p = 0 ; p<this.state.rtaAnswers.length; p++){
            if (p == 2){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1

            }else if( p == 7){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else if(p == 8){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else{
                marcador+= Number(this.state.rtaAnswers[p])
            }
        }
        console.log(marcador)
        if(marcador >= 40  ) {this.setState({indicador:1})}
        else if(marcador >= 24) {this.setState({indicador:2})}
        else if(marcador <= 23) {this.setState({indicador:3})}
    }

    logicaTurismo(){
        let marcador = 0 ;
        
        for(let p = 0 ; p<this.state.rtaAnswers.length; p++){
            if (p == 2){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1

            }else if( p == 7){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else if(p == 8){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else{
                marcador+= Number(this.state.rtaAnswers[p])
            }
        }
        console.log(marcador)
        if(marcador >= 40  ) {this.setState({indicador:1})}
        else if(marcador >= 24) {this.setState({indicador:2})}
        else if(marcador <= 23) {this.setState({indicador:3})}
    }
    logicaOfertaLaboral(){
        let marcador = 0 ;
        
        for(let p = 0 ; p<this.state.rtaAnswers.length; p++){
            if (p == 2){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1

            }else if( p == 5){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else if(p == 8){
                this.state.rtaAnswers[p] == '1' ? marcador+=5: 
                this.state.rtaAnswers[p] == '2' ? marcador+=4:
                this.state.rtaAnswers[p] == '3' ? marcador+=3:
                this.state.rtaAnswers[p] == '4' ? marcador+=2:
                marcador+=1
            }else{
                marcador+= Number(this.state.rtaAnswers[p])
            }
        }
        console.log(marcador)
        if(marcador >= 40  ) {this.setState({indicador:1})}
        else if(marcador >= 24) {this.setState({indicador:2})}
        else if(marcador <= 23) {this.setState({indicador:3})}
    }

    sendData() {
        // pongo a que "simule la carga"
        this.setState({loading:!this.state.loading});
        
        // hago la logica del cemaforo ver si es alerta amar, roj, ver
         // 1. Verde, 2. Amarillo, 3. Rojo
        this.logicaSemaforo();

        
        // el json que va pa la db

            let data = {[this.state.dni]:{
                "nombre":this.state.rtaDefaultAnswers[0],
                "edad":this.state.rtaDefaultAnswers[1],
                "origen":this.state.rtaDefaultAnswers[2],
                "estrato":this.state.rtaDefaultAnswers[3],
                "destino":this.state.rtaDefaultAnswers[4],
                "indicador":this.state.indicador,
            }};
            // el fetchi
            fetch('http://10.153.60.56:8000/api/save/perfil-victima/',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            }
        )
            .then((response) => { 
              if(response.ok){
                  // y la respuesta ok, entonces limpie los datos que mando y ambie de vista
                this.setState({loading:!this.state.loading}, ()=>{this.emptyData()});
                console.log('yeah')
              }else{
                  console.log('bolsa')
              }
            })
            .catch((error) => {
              console.error(error);
            });
        
        
    }

    emptyData(){
        // borre todo y cambie a la vista recomendacion
        // asi es como se navega, "nobmre de la vista definida en el App.js", y el otro es para compartir una variable entre vistas
        // alla la recibe y hace la validacion para saber cual mostrar
        this.setState({defaultAnswers: [], rtaAnswers: [], dni:'', showDNI:true, showSurvey:false},
    ()=>{this.props.navigation.navigate('Recomendacion',{indicador:this.state.indicador})})
    }

    loadDefaultQuestions = (item) => {
        // ME PASA UN NODO DEL JSON
        // ej: {key:'Nombre',id:0}
        let {key,id} = item;
        // aca traigo las respuestas que se han marcado para poder salvar
         let defaultAnswers = this.state.rtaDefaultAnswers;

        // css y html ..

        // el id=== 5 es para saber si al renderizar debo es mostrar el picker de "oferta laborarl", truismo blabla
        // o si un input text
        // ahi es donde carga eso de oferta laborarl turismo blabla

        // si no, ahi muestra el input text

        // on value o ontext change es para actualizar la info de la variable y que se mantega la renderizada sin problema
        
        // eso como tal para renderizar las preguntas de info de contacto
        return <View style={{marginTop:15, alignItems:'center'}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>{key}</Text>
        {id === 5 ? 
        <Picker style={{width:'90%'}} selectedValue={this.state.defaultSurveyInfo.rtaSection} onValueChange={(itemValue) =>{
            let modify = this.state.defaultSurveyInfo;
            modify.rtaSection = itemValue; 
            this.setState({modify});
        }}>
            <Picker.Item label={this.state.defaultSurveyInfo.sections[0]} value='l'/>
            <Picker.Item label={this.state.defaultSurveyInfo.sections[1]} value='t'/>
            <Picker.Item label={this.state.defaultSurveyInfo.sections[2]} value='a'/>
            <Picker.Item label={this.state.defaultSurveyInfo.sections[3]} value='s'/>
        </Picker>:

        <Input placeholder='Respuesta' placeholderTextColor='black' autoCorrect={false} 
        keyboardType={id === 1 ? 'numeric':id === 3 ? 'numeric':'default'}
        value={this.state.rtaDefaultAnswers[id]}
        onChangeText={info=>{
            defaultAnswers[id] = info;
            
            this.setState({defaultAnswers});
        }}
        />}
        
    </View>  
    
    }
     getQuestions(itemPicked) {
         // segun el valor seleccionado "oferta laborarl", turismo balbalba llame al end point
         fetch('http://10.153.60.56:8000/api/preguntas/'+itemPicked)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({surveyInfo: responseJson}, () =>{
                let size = this.state.surveyInfo.data.length; 
                let info = this.state.rtaAnswers;
                let surveyInfo = this.state.surveyInfo;
                // lleno el array de valor 1 = por que todas las rtas empiezan de 1 a 5
                // y lo hago con for para que el array sea de largo la misma cantidad de preguntas
                // lo del pos, es para saber a que pregunta corresponde cada rta
                for(let i = 0; i < size; i++){
                    info.push(1);
                   let f = Object.assign(surveyInfo.data[i], {pos:i});
                   surveyInfo.data[i] = f;
                    
                }
                this.setState({surveyInfo})
                // cambio el estado para que ya no muestre esta vista si no la proxima, que sería la de las preguntas
                this.setState({info},() =>{
                    this.setState({showSurvey:!this.state.showSurvey},
                        ()=>{this.setState({showMainSurvey:!this.state.showMainSurvey})});
                })
                
            }) ;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    loadQuestions (item) { 
        //aca tengo el slider de 1 a 5
        // y lo mismo de value change para estar actualizando la variable, pero en este caso fijese que esta dentro del array
        // y uso el pos para saber a que respuesta pertenece
        // en los onvalue change ese "value" es lo que esta digitando la persona que se lo asigno a la respuesta que estoy guardando para
        //recordar 

        // en el text, rederizo esa rta, y toca con .state para que se actualice a medida que vaya cambiandolo el usuario en el slider
        return (
            <View style={{flex:1}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize:16}}>{item.key}</Text>
                <Slider 
                step={1} 
                style={{width:SCREEN_WIDTH*0.8}} 
                value={this.state.rtaAnswers[item.pos]}
                onValueChange={value => {
                    this.state.rtaAnswers[item.pos] = value;
                    this.setState({rtaAnswers:this.state.rtaAnswers})
                }}
                minimumValue={1} maximumValue={5}></Slider>
                <Text style={{fontSize:16}}>
                    {this.state.rtaAnswers[item.pos]}
                </Text>
                </View>
            </View>)
    }
 
    _handleDNI() {
        //pongo el boton de carga, a que gire para simular la carga
        this.setState({loading:!this.state.loading})
        // llamo la db
        fetch('http://10.153.60.56:8000/api/antecedentes/'+this.state.dni)
         
          .then((responseJson) => {
            if(responseJson.ok){
                // si exite muestro una alerta que tenia ya un reporte
                // defino los botones que tiene esa alerta
                // y no dej oque la cancele, osea si o si tiene que "entender", o tener "encuenta", la alerta
                Alert.alert('ALERTA',
                'Esta persona tiene reporte(s) activo(s)',
                [
                   
                  
                  {text: 'ENTENDIDO', onPress: () => {
                      // ya no muestro el dni por eso hago !showDNI, y muestro el mainsurvey
                      //{this.state.showDNI ? this.displayDNI(): this.state.showMainSurvey ? this.displayMainSurvey(): this.displaySurvey()}
                      // para que como eso esta "escuchando", al yo cambiar this.state.showDNI a false, se cumpla la siguiente condicion
                    this.setState({showDNI: !this.state.showDNI, showMainSurvey: !this.state.showMainSurvey},
                        ()=>{this.setState({loading:!this.state.loading})})
                  }},
                ],
                { cancelable: false })
            }else{
                // ya no muestro el dni por eso hago !showDNI, y muestro el mainsurvey
                      //{this.state.showDNI ? this.displayDNI(): this.state.showMainSurvey ? this.displayMainSurvey(): this.displaySurvey()}
                      // para que como eso esta "escuchando", al yo cambiar this.state.showDNI a false, se cumpla la siguiente condicion
                this.setState({showDNI: !this.state.showDNI, showMainSurvey: !this.state.showMainSurvey},
                    ()=>{this.setState({loading:!this.state.loading})})
            }
          })
          .catch((error) => {
            console.error(error);
          });


           /* if(this.state.dni === '1098800123'){
                Alert.alert('ALERTA',
                'Esta persona tiene un reporte activo',
                [
                   
                  
                  {text: 'ENTENDIDO', onPress: () => {
                    this.setState({showDNI: !this.state.showDNI, showMainSurvey: !this.state.showMainSurvey},
                        ()=>{this.setState({loading:!this.state.loading})})
                  }},
                ],
                { cancelable: false })
            }else{
                this.setState({showDNI: !this.state.showDNI, showMainSurvey: !this.state.showMainSurvey},
                    ()=>{this.setState({loading:!this.state.loading})})
            }
 */
        
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor="#2B94B2" barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={{flex:1, backgroundColor:'rgba(204,204,204,0.5)'}}>
            {this.state.showDNI ? this.displayDNI(): this.state.showMainSurvey ? this.displayMainSurvey(): this.displaySurvey()}
          </View>
        </View>
      </View>
    );
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
