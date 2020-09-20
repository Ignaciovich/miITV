import React, {Component} from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
    Text,
    View,
    ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-generator';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class CitaView extends Component{
    constructor(props){
        super(props);
        this.state = {
            cita: this.props.route.params.cita,
            coche: {},
            estacion: {},
        }
    };

    componentDidMount = () => {
        var c ={
            "matricula": this.state.cita.matricula,
        }

        fetch("http://"+constantes.ip+":8080/itvApp/getCocheByMatricula", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(c),
            })
            .then(function(response){  
                return response.json();   
            })
            .then(data => {
                this.setState({coche: data})
                console.log(this.state.coche)
            }
        );
        
        fetch("http://"+constantes.ip+":8080/itvApp/getEstacionById", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(this.state.cita.estacion),
            })
            .then(function(response){  
                return response.json();   
            })
            .then(data => 
                this.setState({estacion: data})
            );
    }

    cargarEvaluacion = () => {
        if (this.state.cita.resultado == 0){
            return (
                <Text style={styles.title}>Sin resultados.</Text>
            );
        }else if (this.state.cita.resultado == 1){
            return (
                <Text style={{...styles.title, color: "#52c759"}}>Apta.</Text>
            );
        }else{
            return (
                <Text style={{...styles.title, color: "#c75252"}}>No apta.</Text>
            );
        }
    };

    cargarObservaciones = () => {
        if (this.state.cita.resultado != 0){
            return (
                <View>
                    <Text style={styles.subtitle}>Observaciónes del mecánico:</Text>
                    <View style={styles.view_contorno}>
                        <Text style={styles.text}>{this.state.cita.observaciones}</Text>
                    </View>
                </View>
            );
        }
    }

    cargarCodigoQR = () => {
        if (this.state.cita.resultado == 0){
            return (
                <QRCode
                    value={this.state.cita}
                    size={200}
                    bgColor={AppColors.black}
                    fgColor={AppColors.backgrounLogin}/>
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.subcontainer}>
                    <View style={styles.view_horizontal}>
                        <Text style={styles.title}>Resultado evaluación: </Text>
                        {this.cargarEvaluacion()}
                    </View>
                    <View style={{justifyContent: 'center', alignItems:'center', margin:20}}>
                        {this.cargarCodigoQR()}
                    </View>
                    <View>
                        <Text style={styles.title}>Información del vehículo:</Text>
                        <Text style={styles.subtitle}>Marca y modelo:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.coche.marca + " " + this.state.coche.modelo}
                            </Text>
                        </View>
                        <Text style={styles.subtitle}>Matrícula:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.coche.matricula}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Lugar:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.estacion.nombre}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Fecha y hora:</Text>
                        <View style={styles.view_contorno}>
                            <Text style={styles.text}>
                                {this.state.cita.fecha} {this.state.cita.hora}
                            </Text>
                        </View>
                    </View>
                    {this.cargarObservaciones()}
                </ScrollView>
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
    subcontainer: {
        margin: 10,
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
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: AppColors.inputLogin,
    },
    text: {
        padding: 5,
        color: AppColors.white,
    }
});