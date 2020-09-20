import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import {HR} from '.';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getColors as AppColors} from '../styles/colors';

const CochesList = ({coches, onPressItem}) => {

    return (
        <ScrollView style={styles.list}>
            {coches.map((coche) => (
                <View key={coche.matricula}>
                    <TouchableOpacity onPress={() => onPressItem(coche)} style={styles.button}>
                        <View style={styles.img_container}>
                            <Ionicons name="ios-information-circle" size={45} color={AppColors.backgrounLogin}/>   
                        </View>
                        <View>
                            <View style={styles.text_container}>
                                <View style={styles.text_container}>
                                    <Text style={styles.text_title}>Marca: </Text>
                                    <Text>{coche.marca}</Text>
                                </View>
                                <View style={{...styles.text_container, paddingLeft: 20}}> 
                                    <Text style={styles.text_title}>Modelo: </Text>
                                    <Text>{coche.modelo}</Text>
                                </View>   
                            </View>
                            <View style={styles.text_container}>
                                <Text style={styles.text_title}>Matrícula: </Text>
                                <Text>{coche.matricula}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <HR/>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        width: Dimensions.get('window').width,
        marginTop: 12,
    },
    button: {
        flexDirection: "row",
        paddingLeft: 10,
    },
    text_container:{
        flexDirection: "row",
    },
    text_title:{
        fontWeight: "bold",  
    },
    img_container: {
        height: 45,
        width: 45,
    },
    img:{
        flex: 1,
        resizeMode: "contain",
    }
});

export default CochesList;