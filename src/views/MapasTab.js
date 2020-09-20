import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, Button, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedbackBase  } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {getColors as AppColors} from '../styles/colors';
import {HR} from '../components';
import Communications from 'react-native-communications';
import {constantes} from '../data/constantes';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class MapasTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: constantes.usuario,
      latitude: 0,
      longitude: 0,
      markers: [
          {
            id: 1,
            coordinate: {
              latitude: 38.693053,
              longitude: -4.108520,
            },
            nombre: "ITV Virgen de Gracia",
            telefono: 123456789,
          },
          {
            id: 2,
            coordinate: {
              latitude: 38.684820, 
              longitude: -4.110761,
            },
            nombre: "ITV Ortega",
            telefono: 123456789,
          }
      ],
      pruebaMarkers: [],
      modalVisible: false,
      markerSelected: {
        id: 0,
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
        nombre: "",
        telefono: 0,
      },
    };
  }

  componentDidMount = async() => {
    var listaEstaciones = []

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert("No se han garantizado los permisos")
    }

    fetch("http://"+constantes.ip+":8080/itvApp/estacionList")
        .then(response => response.json() )
        .then(data => {
          data.map((estacion) => {
            this.state.pruebaMarkers.push({
              id: estacion.id, 
              coordinate:{
                latitude: estacion.latitud+"",
                longitude: estacion.longitud+"",
              },
              nombre: estacion.nombre,
              telefono: estacion.telefono,
            });
          })
          //this.setState({markers: listaEstaciones});
        })
        .catch(error => console.log(error));

    let location = await Location.getCurrentPositionAsync({});
    this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude})
  }

  seleccionarMarker = async(e) => {
    const coordinate = e.nativeEvent.coordinate;
    const marker = this.state.markers.find(
      m => m.coordinate.latitude === coordinate.latitude
    );
    
    this.setState({latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude});
    this.setState({modalVisible: true});
    await this.setState({markerSelected: marker});
  }

  navegar = (index) => {
    this.setState({modalVisible: false});

    if (index == 0){
      console.log(this.state.markerSelected);
      //this.props.navigation.navigate("Cita_nueva", {"usuario": this.state.usuario, "estacion": this.state.markerSelected});
    }else{
      Communications.phonecall(this.state.markerSelected.telefono+"", true)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({modalVisible: false});
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Has seleccionado {this.state.markerSelected.nombre}</Text>
                  <HR color={AppColors.black}/>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.navegar(0)}}>
                    <Text style={styles.buttonText}>Pedir cita</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.navegar(1)}}>
                    <Text style={styles.buttonText}>Llamar por teléfono</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.setState({modalVisible: false})}}>
                    <Text style={styles.buttonText}>Salir</Text>
                  </TouchableOpacity>
                </View>
              </View>
        </Modal>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onMarkerPress={this.seleccionarMarker}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {
            this.state.markers.map(marker => (
              <Marker 
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.nombre}
              />
            ))
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  minicontainer: {
    marginTop: 0,
  },
  map: {
    height: height,
    width: width,
  },
  modalView: {
    margin: 20,
    marginTop: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
},
  buttonText: {
      textAlign: "center",
  },
});

/*
  
*/