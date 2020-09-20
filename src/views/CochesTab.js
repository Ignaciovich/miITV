import React, {Component} from 'react';
import { 
    StyleSheet, 
    SafeAreaView,
} from 'react-native';
import {CochesList, FAB} from '../components';
import {getCochesByDueño} from '../data/Coches';
import {getColors as AppColors} from '../styles/colors';
import {constantes} from '../data/constantes';

export default class CochesTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: constantes.usuario,
            coches: [],
        }
    };

    componentDidMount = () => {
        // var user = {
        //     "id": this.state.usuario.id,
        // }

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
                this.setState({coches: data})
            }
        });
    };

    onPressItem = (param) => {
        this.props.navigation.navigate('Coche', {coche: param});
    }

    handleAdd = () => {
        this.props.navigation.navigate('Coche_nuevo');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CochesList coches={this.state.coches} onPressItem={this.onPressItem}/>
                <FAB
                    text="+"
                    fabStyle={{backgroundColor: AppColors.buttonLogin}}
                    textStyle={{color: AppColors.black}}
                    onPress={this.handleAdd}
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