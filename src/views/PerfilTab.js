import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { getColors as AppColors } from "../styles/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {constantes} from '../data/constantes';

export default class PerfilTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_info: false,
      edit_pass: false,
      info_arrow: "ios-arrow-back",
      pass_arrow: "ios-arrow-back",
      id: constantes.usuario.id,
      nombre: constantes.usuario.nombre,
      telefono: constantes.usuario.telefono,
      direccion: constantes.usuario.direccion,
      passwordAntigua: constantes.usuario.password,
      passwordRepe: "",
      passwordNueva: "",
    };
  }

  changeStatus = (id) => {
    if (id == 0){
        this.setState({ edit_info: !this.state.edit_info });
        
        if (this.state.edit_info){
            this.setState({info_arrow: "ios-arrow-back"});
        }else{
            this.setState({info_arrow: "ios-arrow-down"});
        }
    }else{
        this.setState({ edit_pass: !this.state.edit_pass })

        if (this.state.edit_pass){
            this.setState({pass_arrow: "ios-arrow-back"});
        }else{
            this.setState({pass_arrow: "ios-arrow-down"});
        }
    }
  }

  actualizarDatos = () => {
    const {id, nombre, passwordAntigua, telefono, direccion} = this.state;

    if (nombre !== ""){
      const usuario = {
        "id": id,
        "password": passwordAntigua,
        "nombre": nombre,
        "telefono": telefono,
        "direccion": direccion,
      };

      fetch("http://"+constantes.ip+":8080/itvApp/executeUpdateUser ", {
          method: "PUT",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }, 
          body:  JSON.stringify(usuario),
      }).then(function(response){  
          return response.json();   
      }).then(function(data){ 
          console.log(data);
      });
      this.changeStatus(0);
      ToastAndroid.show("Datos actualizados correctamente", ToastAndroid.SHORT);
    }else{
      ToastAndroid.show("La contraseña nueva no puede ser iguala la antigua", ToastAndroid.SHORT);
    }    
  }

  actualizarPassword = () => {
    const {id, nombre, passwordAntigua, passwordRepe, passwordNueva, telefono, direccion} = this.state;
    
    if (passwordAntigua !== ""){
      if (passwordNueva !== ""){
        if (/\d/.test(passwordNueva)){
          if (passwordAntigua === passwordRepe){
            if (passwordRepe !== passwordNueva){
              const usuario = {
                "id": id,
                "password": passwordNueva,
                "nombre": nombre,
                "telefono": telefono,
                "direccion": direccion,
                }
                
              fetch("http://"+constantes.ip+":8080/itvApp/executeUpdateUser ", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
              body:  JSON.stringify(usuario),
              }).then(function(response){  
                  return response.json();   
              }).then(function(data){ 
                  console.log(data)
              });

              this.setState({passwordAntigua: passwordNueva, passwordNueva: "", passwordRepe: ""});
              this.changeStatus(1);
              ToastAndroid.show("Datos actualizados correctamente", ToastAndroid.SHORT);
            }else{
              ToastAndroid.show("La contraseña nueva no puede ser iguala la antigua", ToastAndroid.SHORT);
            }
          }else{
            ToastAndroid.show("La contraseña nueva no puede ser iguala la antigua", ToastAndroid.SHORT);
          }
        }else{
          ToastAndroid.show("La contraseña nueva no puede ser iguala la antigua", ToastAndroid.SHORT);
        }
      }else{
        ToastAndroid.show("La contraseña nueva no puede ser iguala la antigua", ToastAndroid.SHORT);
      }
    }else{
      ToastAndroid.show("La contraseña nueva no puede ser iguala la antigua", ToastAndroid.SHORT);
    }
  }

  cerrarSesión = () => {
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.button_container}
          onPress={() => {
            this.changeStatus(0);
          }}
        >
          <Ionicons
            name="ios-person"
            size={20}
            color={AppColors.white}
            style={styles.icon}
          />
          <Text style={styles.text}>Editar información.</Text>
          <Ionicons
            name={this.state.info_arrow}
            size={20}
            color={AppColors.white}
            style={{marginLeft: "54%"}}
          />
        </TouchableOpacity>
        {this.state.edit_info && (
          <View style={styles.subcontainer}>
            <Text style={styles.title}>Nombre:</Text>
            <View style={styles.view_contorno}>
              <TextInput style={styles.input} onChangeText={(value) => this.setState({nombre: value})}>{this.state.nombre}</TextInput>
            </View>
            <Text style={styles.title}>Teléfono:</Text>
            <View style={styles.view_contorno}>
              <TextInput style={styles.input} onChangeText={(value) => this.setState({telefono: value})}>{this.state.telefono}</TextInput>
            </View>
            <Text style={styles.title}>Dirección:</Text>
            <View style={styles.view_contorno}>
              <TextInput style={styles.input} onChangeText={(value) => this.setState({direccion: value})}>{this.state.direccion}</TextInput>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.actualizarDatos}>
              <Text style={styles.button_text}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.button_container}
          onPress={() => {
            this.changeStatus(1);
          }}
        >
          <Ionicons
            name="ios-key"
            size={20}
            color={AppColors.white}
            style={styles.icon}
          />
          <Text style={styles.text}>Cambiar contraseña.</Text>
          <Ionicons
            name={this.state.pass_arrow}
            size={20}
            color={AppColors.white}
            style={{marginLeft: "50%"}}
          />
        </TouchableOpacity>
        {this.state.edit_pass && (
          <View style={styles.subcontainer}>
            <Text style={styles.title}>Contraseña actual:</Text>
            <View style={styles.view_contorno}>
              <TextInput style={styles.input} autoCapitalize="none" secureTextEntry onChangeText={(value) => this.setState({passwordRepe: value})}>{this.state.passwordRepe}</TextInput>
            </View>
            <Text style={styles.title}>Nueva contraseña:</Text>
            <View style={styles.view_contorno}>
              <TextInput style={styles.input} autoCapitalize="none" secureTextEntry onChangeText={(value) => this.setState({passwordNueva: value})}>{this.state.passwordNueva}</TextInput>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.actualizarPassword}>
              <Text style={styles.button_text}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.button_container} onPress={this.cerrarSesión}>
          <Ionicons
            name="ios-log-out"
            size={20}
            color="#FF0000"
            style={styles.icon}
          />
          <Text style={{...styles.text, color: AppColors.red}}>Cerrar sesión.</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgrounLogin,
  },
  button_container: {
    flexDirection: "row",
    padding: 20,
  },
  text: {
    paddingLeft: 20,
    color: AppColors.white,
  },
  subcontainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  view_contorno: {
    backgroundColor: AppColors.viewContorno,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    color: AppColors.white,
  },
  button: {
    margin: 15,
    height: 40,
    borderRadius: 5,
    backgroundColor: AppColors.buttonLogin,
    color: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text:{
    color: AppColors.white,
  },
  input: {
    paddingHorizontal: 10,
  }
});