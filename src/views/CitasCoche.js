import React, {Component} from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
    Text,
    ToastAndroid,
    View,
} from 'react-native';
import {CitasList, FAB} from '../components';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class CitasTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            citas: [],
            usuario: constantes.usuario,
            coche: this.props.route.params.coche,
        }
    };

    componentDidMount = () => {
        var c = {
            "matricula": this.state.coche.matricula,
        }

        fetch("http://"+constantes.ip+":8080/itvApp/getCitaByMatricula", {
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
                this.setState({citas: data})
            });
    }

    onPressItem = (param) => {
        this.props.navigation.navigate('Cita', {cita: param});
    }

    comprobarITV = () => {
        if (this.state.citas.length > 0){ 
            return(
                <CitasList citas={this.state.citas} onPressItem={this.onPressItem}/>
            );
        }else{
            return(
                <View>
                    <Text>No hay ninguna ITV realizada con este vehículo.</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.comprobarITV()}
                <FAB
                    icon="ios-refresh"
                    fabStyle={{backgroundColor: AppColors.buttonLogin}}
                    textStyle={{color: AppColors.black}}
                    onPress={this.handleRefresh}
                />
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});