import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker,
    ScrollView,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {mesesNoBisiestos, mesesBisiestos} from '../data/Meses';

export default class AñadirCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      matricula: "",
      estacion: "",
      mes: (new Date().getMonth()+1),
      dia: new Date().getDate(),
      año: new Date().getFullYear(),
      hora: "",
      meses: [],
      dias: [],
      añoActual: new Date().getFullYear(),
    };
  }

  componentDidMount = () => {
    if (this.state.año % 4 == 0){
      this.setState({meses: mesesBisiestos});
      this.setState({dias: mesesBisiestos[this.state.mes-1].dias})
    }else{
      this.setState({meses: mesesNoBisiestos});
      this.setState({dias: mesesNoBisiestos[this.state.mes-1].dias})
    }
  }

  crearCita = () => {
    const {correo, matricula, estacion} = this.state;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /*if (correo !== "" && regex.test(correo.toLowerCase())){
      if (matricula !== "" && matricula.length === 8){
        if (estacion !== ""){
          const correcto = comprobarFecha();
        }
      }
    }*/

    const correcto = this.comprobarFecha();
  }

  comprobarFecha = () =>{
    var correcto = true;
    const dia = new Date().getDate();
    const mes = new Date().getMonth()+1;
    const año = new Date().getFullYear();

    if (this.state.dia < dia){
      if (this.state.mes <= mes){
        if (this.state.año == año){
          correcto = false;
        }
      }
    }else{
      if (this.state.mes < mes){
        if (this.state.año == año){
          correcto = false;
        }
      }
    }

    return correcto;
  }

  checkMes = (value) => {
    this.setState({mes: value});

    if (this.state.año % 4 == 0){
      this.setState({dias: mesesBisiestos[value-1].dias})
    }else{
      this.setState({dias: mesesNoBisiestos[value-1].dias})
    }
  }

  checkAño = (value) => {
    this.setState({año: value});

    if (value % 4 == 0){
      this.setState({meses: mesesBisiestos})
      this.setState({dias: mesesBisiestos[this.state.mes-1].dias})
    }else{
      this.setState({meses: mesesNoBisiestos})
      this.setState({dias: mesesNoBisiestos[this.state.mes-1].dias})
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Correo usuario:</Text>
          <View style={styles.view_contorno}>
            <TextInput style={styles.text} keyboardType="email-address" onChangeText= {(value) => this.setState({correo: value})}></TextInput>
          </View>
          <Text style={styles.title}>Matrícula vehículo:</Text>
          <View style={styles.view_contorno}>
            <TextInput style={styles.text} onChangeText= {(value) => this.setState({matricula: value})} placeholderTextColor= {AppColors.inputPlaceHolder} placeholder="Ej. AAAA 000"></TextInput>
          </View>
          <Text style={styles.title}>Estación:</Text>
          <View style={styles.view_contorno}>
            <TextInput style={styles.text}  onChangeText= {(value) => this.setState({estacion: value})}></TextInput>
          </View>
          <Text style={styles.title}>Fecha:</Text>
          <View style={styles.view_horizontal}>
            <View style={{...styles.view_contorno, width: "45%"}}>
              <Picker selectedValue={this.state.mes} onValueChange={(itemValue, itemIndex) => {this.checkMes(itemValue)}}>
                {
                  this.state.meses.map((mes) => {
                    
                    return(
                      <Picker.Item label={mes.mes} value={mes.numero} key={mes.numero}/>
                    )
                  })
                }
              </Picker>
            </View>
            <View style={{...styles.view_contorno, width: "22%", marginLeft: 5}}>
              <Picker selectedValue={this.state.dia} onValueChange={(itemValue, itemIndex) => {this.setState({dia: itemValue})}}>
              {
                this.state.dias.map((dia) => {
                  return(
                    <Picker.Item label={dia+""} value={dia} key={dia}/>
                  )
                })
              }
              </Picker>
            </View>
            <View style={{...styles.view_contorno, width: "30%", marginLeft: 5}}>
              <Picker selectedValue={this.state.año} onValueChange={(itemValue, itemIndex) => {this.checkAño(itemValue)}}>
                <Picker.Item label={this.state.añoActual+""} value={this.state.añoActual} key={this.state.añoActual}/>
                <Picker.Item label={this.state.añoActual+1+""}  value={this.state.añoActual+1} key={this.state.añoActual+1}/>
              </Picker>
            </View>
          </View>
          <Text style={styles.title}>Hora:</Text>
          <View style={styles.view_contorno}>
            <TextInput style={styles.text}  onChangeText= {(value) => this.setState({hora: value})} placeholderTextColor={AppColors.inputPlaceHolder} placeholder="Ej. 18:00"></TextInput>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.crearCita}>
            <Text style={styles.button_text}>CREAR CITA</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgrounLogin,
    justifyContent: "center",
    padding: 10
  },
  title: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
      color: AppColors.white,
  },
  view_contorno:{
      backgroundColor: AppColors.inputLogin,
      marginBottom: 10,
      borderRadius: 5,
  },
  view_horizontal: {
    flexDirection: "row",
  },
  text: {
      padding: 10,
  },
  img: {
      width: 390,
      height: 220,
      marginBottom: 10,
  },
  button: {
      marginTop: 10,
      marginBottom: 10,
      height: 50,
      borderRadius: 5,
      backgroundColor: AppColors.buttonLogin,
      justifyContent: "center",
  },
  button_text: {
      textAlign: "center", 
      color: "#FFF",
      padding: 8,
  },
})

/*

        <Picker selectedValue={this.state.dia} onValueChange={(itemValue, itemIndex) => {this.setState({dia: itemValue})}}>
          {
            this.state.meses[this.state.mes-1].dias.map((dia) => {
              return(
                <Picker.Item label={dia+""} value={dia} key={dia}/>
              )
            })
          }
        </Picker>
*/