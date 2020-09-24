import React, { Component } from 'react';
import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Picker,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {mesesNoBisiestos, mesesBisiestos} from '../data/Meses';
import {constantes} from '../data/constantes';

export default class AñadirCita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: constantes.usuario,
      coches: [],
      estacion: this.props.route.params.estacion,
      mes: (new Date().getMonth()+1),
      dia: new Date().getDate(),
      año: new Date().getFullYear(),
      hora: "",
      meses: [],
      dias: [],
      añoActual: new Date().getFullYear(),
      horasDia: [],
      coche: null,
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
    this.checkHorasDisponibles(this.state.dia, this.state.mes, this.state.año);

    fetch("http://"+constantes.ip+":8080/itvApp/getCocheByOwner", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(this.state.usuario.id),
        })
        .then(function(response){  
            return response.json();   
        })
        .then(data => { 
            if (data){
                this.setState({coches: data, coche: data[0].matricula})
            }
      });
  }

  crearCita = () => {
    const cita = {
      "matricula": this.state.coche,
      "usuario": this.state.usuario.id,
      "estacion": this.state.estacion.id,
      "resultado": 0,
      "fecha": this.state.dia+"/"+this.state.mes+"/"+this.state.año,
      "hora": this.state.hora,
    }    

    fetch("http://"+constantes.ip+":8080/itvApp/createCita", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(cita),
      })
    .then(response => {  
      if (response.status == 200){
        ToastAndroid.show("Cita creada con éxito.", ToastAndroid.SHORT);
        this.props.navigation.goBack();
      }else{
        ToastAndroid.show("Ha ocurrido un error inesperado, vuelva a intentarlo más tarde.", ToastAndroid.SHORT);
      }
    })
    .then(data => { 
      return data;
    });
  }
  
  checkDia = async(value) => {
    this.setState({dia: value});

    this.checkHorasDisponibles(value, this.state.mes, this.state.año);
  }

  checkMes = (value) => {
    this.setState({mes: value});

    if (this.state.año % 4 == 0){
      this.setState({dias: mesesBisiestos[value-1].dias})
    }else{
      this.setState({dias: mesesNoBisiestos[value-1].dias})
    }
    this.checkHorasDisponibles(this.state.dia, value, this.state.año);
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
    this.checkHorasDisponibles(this.state.dia, this.state.mes, value);
  }

  checkHorasDisponibles = async(dia, mes, año) => {
    //const {dia, mes, año} = this.state;
    var horas = ["9:00", "10:00", "11:00", "12:00", "13:00", "17:00", "18:00", "19:00"];
    const cita = {
      "fecha": dia+"/"+mes+"/"+año,
    }
    this.setState({horasDia: horas});
    var lista = [];

    await fetch("http://"+constantes.ip+":8080/itvApp/getCitaByFecha", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(cita),
    }).then(response => {
      return response.json();   
    }).then(data => { 
      lista = data;
    });

    for (let i = 0; i < lista.length; i++){
        horas = horas.filter(value => value !== lista[i].hora);
    }
    this.setState({horasDia: horas});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Correo usuario:</Text>
          <View style={styles.view_contorno}>
            <Text style={styles.text}>{this.state.usuario.email}</Text>
          </View>
          <Text style={styles.title}>Matrícula vehículo:</Text>
          <View style={styles.view_contorno}>
            <Picker selectedValue={this.state.coche} onValueChange={(itemValue, itemIndex) => this.setState({coche: itemValue})}>
              {
                this.state.coches.map((coche) => {
                  return(
                    <Picker.Item label={coche.matricula + ", " + coche.marca + " " + coche.modelo} value={coche.matricula} key={coche.matricula}/>
                  )
                })
              }
            </Picker>
          </View>
          <Text style={styles.title}>Estación:</Text>
          <View style={styles.view_contorno}>
            <Text style={styles.text}>{this.state.estacion.nombre}</Text>
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
              <Picker selectedValue={this.state.dia} onValueChange={(itemValue, itemIndex) => {this.checkDia(itemValue)}}>
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
            <Picker selectedValue={this.state.hora} onValueChange={(value, index) => this.setState({hora: value})}>
              {
                this.state.horasDia.map((value) => {
                  return(
                    <Picker.Item label={value+""} value={value} key={value}/>
                  )
                })
              }
            </Picker>
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
      height: 40,
      justifyContent: 'center',
  },
  view_horizontal: {
    flexDirection: "row",
  },
  text: {
      padding: 10,
  },
  button: {
      marginTop: 10,
      marginBottom: 10,
      height: 40,
      borderRadius: 5,
      backgroundColor: AppColors.buttonLogin,
      justifyContent: "center",
  },
  button_text: {
      textAlign: "center",
      justifyContent: 'center',
      color: "#FFF",
      padding: 8,
  },
})