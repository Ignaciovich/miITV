import React, {Component} from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    BackHandler,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getColors as AppColors } from "../styles/colors";
import {constantes} from '../data/constantes';


export default class CocheView extends Component{
    constructor(props){
        super(props);
        this.state = {
            coche: this.props.route.params.coche,
            editable: false,
            titulo: "EDITAR",
            color: "#ed832d",
        };
    };

    onPressEditar = () => {
        this.setState({editable: !this.state.editable});
        if (this.state.titulo === "EDITAR"){
            this.setState({titulo: "GUARDAR"})
            this.setState({color: AppColors.verde})
            
        }else{
            //Realizar edicion de datos
            this.setState({titulo: "EDITAR"})
            this.setState({color: AppColors.orange})

        }
    }

    onPressEliminar = () => {
        var coche = {
            "matricula": this.state.coche.matricula,
        }

        fetch("http://"+constantes.ip+":8080/itvApp/deleteCocheByMatricula", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(coche),
        })
        .then(function(response){  
            return response.json();   
        })
        .then(data => { 
            console.log(data)
        });

        this.props.navigation.goBack();
    };

    onPressITV = () => {
        this.props.navigation.navigate('CitasCoche', {coche: this.state.coche});
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>Información del vehículo: </Text>
                    <View style={styles.img_container}>
                        <Image style={styles.img} source={require('../../assets/coche.jpg')}/>
                    </View>
                    <Text style={styles.subtitle}>Marca y modelo:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput editable={this.state.editable} style={styles.text} onChangeText={text => this.setState(prevState => ({
                            coche: {
                                ...prevState.coche,
                                marca: text,
                            }
                        }))}>
                            {this.state.coche.marca}
                        </TextInput>
                    </View>
                    <Text style={styles.subtitle}>Modelo:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput editable={this.state.editable} style={styles.text} onChangeText={text => this.setState(prevState => ({
                            coche: {
                                ...prevState.coche,
                                modelo: text,
                            }
                        }))}>
                            {this.state.coche.modelo}
                        </TextInput>
                    </View>
                    <Text style={styles.subtitle}>Matrícula:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput editable={false} style={styles.text}>
                            {this.state.coche.matricula}
                        </TextInput>
                    </View>
                    <Text style={styles.subtitle}>Descripción:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput editable={this.state.editable} style={styles.text} onChangeText={text => this.setState(prevState => ({
                            coche: {
                                ...prevState.coche,
                                descripcion: text,
                            }
                        }))}>
                            {this.state.coche.descripcion}
                        </TextInput>
                    </View>
                    <Text style={styles.subtitle}>Fecha de adquisición:</Text>
                    <View style={styles.view_contorno}>
                        <TextInput editable={this.state.editable} style={styles.text} onChangeText={text => this.setState(prevState => ({
                            coche: {
                                ...prevState.coche,
                                adquisicion: text,
                            }
                        }))}>
                            {this.state.coche.adquisicion}
                        </TextInput>
                    </View>
                    <TouchableOpacity style={{...styles.button, backgroundColor: AppColors.buttonLogin}} onPress={this.onPressITV}>
                        <Text style={styles.button_text}>Ver ITVs realizadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.button, backgroundColor: this.state.color}} onPress={this.onPressEditar}>
                        <Text style={styles.button_text}>{this.state.titulo}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.button, backgroundColor: "#c75252"}} onPress={this.onPressEliminar}>
                        <Text style={styles.button_text}>ELIMINAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgrounLogin,
    },
    subcontainer: {
        margin: 10,
        justifyContent: "center",
    },
    view_horizontal:{
        flexDirection: "row",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
        color: AppColors.white,
    },
    subtitle: {
        fontWeight: "bold",
        marginBottom: 5,
        color: AppColors.white,
    },
    view_contorno:{
        backgroundColor: AppColors.inputLogin,
        marginBottom: 10,
        borderRadius: 5,
    },
    text: {
        padding: 5,
    },
    img: {
        width: 390,
        height: 220,
        marginBottom: 10,
    },
    button: {
        marginBottom: 10,
        height: 40,
        borderRadius: 5,
    },
    button_text: {
        textAlign: "center", 
        color: "#FFF",
        padding: 8,
    },
});