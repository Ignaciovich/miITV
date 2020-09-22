import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    Picker,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import {getColors as AppColors} from '../styles/colors';
import * as ImagePicker from 'expo-image-picker';
import {constantes} from '../data/constantes';
import {crearCoche} from '../data/Coche';

export default class AñadirCoche extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: constantes.usuario,
            marca: "",
            modelo: "",
            matricula: "",
            descripcion: "",
            adquisicion: "",
            //foto: {uri: "https://image.flaticon.com/icons/png/512/26/26561.png"},
            foto: require("../../assets/silueta.png"),
            tipo: 0,            
        }
    };

    asignarTipoVehiculo = (value) => {
        console.log(value);
        this.setState({tipo: value})
    }

    seleccionarFoto = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.cancelled) {
              await this.setState({ foto: result.uri });
            }
      
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    añadirCoche = () => {
        const {marca, modelo, matricula, tipo, descripcion, adquisicion} = this.state;

        if (marca !== ""){
            if (modelo !== ""){
                if (matricula !== ""){
                    if (matricula.length == 8){
                        if (adquisicion !== ""){
                            var coche = {
                                "matricula": matricula,
                                "marca": marca,
                                "modelo": modelo,
                                "owner": this.state.usuario.id,
                                "tipo": tipo,
                                "descripcion": descripcion !== ""? descripcion : null,
                                "adquisicion": adquisicion,
                            }
                            
                            fetch("http://"+constantes.ip+":8080/itvApp/createCoche", {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body:  JSON.stringify(coche),
                            })
                            .then(function(response){  
                                console.log(response.status);
                                return response.json();   
                            })
                            .then(data => { 
                                console.log(data);
                            });

                            this.props.navigation.goBack();
                        }else{
                            ToastAndroid.show("Rellene el campo de fecha adquisición, por favor.", ToastAndroid.SHORT);
                        }
                    }else{
                        ToastAndroid.show("La matrícula debe contener 4 letras, un espacio y 3 números.", ToastAndroid.SHORT);
                    }
                }else{
                    ToastAndroid.show("Rellene el campo de matrícula, por favor.", ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show("Rellene el campo de modelo, por favor.", ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show("Rellene el campo de marca, por favor.", ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TouchableOpacity onPress={this.seleccionarFoto}>
                        <Image style={styles.img} source={this.state.foto}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Marca:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput onChangeText={text => this.setState({marca: text})} style={styles.text} placeholder="Ej. Wolkswagen"></TextInput>
                    </View>
                    <Text style={styles.title}>Modelo:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput onChangeText={text => this.setState({modelo: text})} style={styles.text} placeholder="Ej. Passat"></TextInput>
                    </View>
                    <Text style={styles.title}>Matrícula:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput onChangeText={text => this.setState({matricula: text})} style={styles.text} placeholder="Ej. 0000 AAA" autoCapitalize="characters"></TextInput>
                    </View>
                    <Text style={styles.title}>Tipo:</Text>
                    <View style={{...styles.view_contorno, justifyContent: 'center',}}>
                        <Picker selectedValue={this.state.tipo} onValueChange={itemValue => this.setState({tipo: itemValue})}>
                            <Picker.Item label="Coche" value="0"/>
                            <Picker.Item label="Moto" value="1"/>
                        </Picker>
                    </View>
                    <Text style={styles.title}>Fecha adquisición:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput onChangeText={text => this.setState({adquisicion: text})} style={styles.text} placeholder="Ej. 20/11/1996"></TextInput>
                    </View>
                    <Text style={styles.title}>Descripcion:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput onChangeText={text => this.setState({descripcion: text})} style={styles.text} placeholder="Ej. Cristales tintados" multiline={true}></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.añadirCoche}>
                        <Text style={styles.button_text}>AÑADIR</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    };
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
        height: 40,
        borderRadius: 5,
        backgroundColor: AppColors.buttonLogin,
        justifyContent: "center",
    },
    button_text: {
        textAlign: "center", 
        color: "#FFF",
        padding: 8,
    },
});