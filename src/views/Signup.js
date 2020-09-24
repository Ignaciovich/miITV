import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ToastAndroid,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
            nombre: '',
            telefono: '',
            direccion: '',
        };
    };

    crearUsuario = () => {
        const {email, password,passwordRepeat, nombre, telefono, direccion} = this.state;
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (regex.test(email.toLowerCase()) && email !== ""){
            if (password === passwordRepeat && password !== ""){
                if (password.length >= 2){
                    if (/\d/.test(password)){
                        if (nombre !== ""){
                            if (telefono.length == 9 || telefono.length == 0){
                                var usuario = {
                                    "id": null,
                                    "email": email,
                                    "password": password,
                                    "nombre": nombre,
                                    "telefono": telefono,
                                    "direccion": direccion,
                                }

                                fetch("http://"+constantes.ip+":8080/itvApp/createUser ", {
                                    method: "POST",
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }, 
                                    body:  JSON.stringify(usuario),
                                }).then(response => {  
                                    if (response.status == 200){
                                        ToastAndroid.show("Usuario insertado con éxito.", ToastAndroid.SHORT);
                                        this.props.navigation.goBack();
                                    }else{
                                        ToastAndroid.show("Ya existe un usuario con ese email.", ToastAndroid.SHORT);
                                    }
                                }).then(function(data){
                                    return(data);
                                });
                            }else{
                                ToastAndroid.show("Introduzca un teléfono correcto no lo introduzca.", ToastAndroid.SHORT);
                            }
                        }else{
                            ToastAndroid.show("Introduzca su nombre, por favor.", ToastAndroid.SHORT);
                        }
                    }else{
                        ToastAndroid.show("La contraseña debe contener al menos 1 carácter numérico.", ToastAndroid.SHORT);
                    }
                }else{
                    ToastAndroid.show("La contraseña debe tener una extensión minima de 8 carácteres.", ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show("Introduzca la contraseña 2 veces, por favor.", ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show("Introduzca un correo correcto, por favor.", ToastAndroid.SHORT);
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.fullContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Correo"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({email: value})}
                        ref = {(input) => this.emailInput = input}
                        keyboardType="email-address"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Contraseña"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordRepeatInput.focus()}
                        autoCapitalize="none"
                        secureTextEntry
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({password: value})}
                        ref = {(input) => this.passwordInput = input}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Repetir contraseña"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        onSubmitEditing={() => this.nameInput.focus()}
                        autoCapitalize="none"
                        secureTextEntry
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({passwordRepeat: value})}
                        ref = {(input) => this.passwordRepeatInput = input}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nombre completo"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        onSubmitEditing={() => this.telefonoInput.focus()}
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({nombre: value})}
                        ref = {(input) => this.nameInput = input}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Teléfono"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="next"
                        onSubmitEditing={() => this.direccionInput.focus()}
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({telefono: value})}
                        ref = {(input) => this.telefonoInput = input}
                        keyboardType="phone-pad"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Dirección"
                        placeholderTextColor= {AppColors.inputPlaceHolder}
                        returnKeyType="done"
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText= {(value) => this.setState({direccion: value})}
                        ref = {(input) => this.direccionInput = input}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.crearUsuario}>
                        <Text style={styles.buttonText}>FINALIZAR</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgrounLogin,
        justifyContent: 'center',
    },
    fullContainer: {
        padding: 20,
        marginTop: 20,
    },
    input: {
        backgroundColor: AppColors.inputLogin,
        color: AppColors.white,
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        backgroundColor: AppColors.buttonLogin,
        paddingVertical: 12,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonText: {   
        textAlign: "center",
        color: AppColors.white,
    },
    pickerContainer: {
        borderRadius: 5,
        backgroundColor: AppColors.inputLogin,
        marginBottom: 15,
        height: 50,
    },
    picker: {
        color: AppColors.inputPlaceHolder,
    },
    item: {
        color: AppColors.white,
    },               
})