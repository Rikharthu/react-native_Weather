import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import moment from 'moment';
import CurrentForecast from '../components/CurrentForecast';
import Button from '../components/Button';
import {icons} from '../assets';


function timezoneToText(timezone){
  return timezone.replace('/',', ').replace('_',' ');
}

function openDarkSkyPromo(){
    Linking.openURL("https://darksky.net/poweredby/")
}
export default class CurrentForecastScene extends Component{

    state={
        locationLabelExpanded:false,
        loading:false
    }

    componentWillMount(){
        
    }

    render(){
        console.log(this.props.loading)
        const {currently, address}=this.props.forecast;
         return (
        <View style={styles.sceneContainer}>
            <View style={styles.headerInfo}>
                {
                    this.props.loading? 
                    <ActivityIndicator 
                        style={styles.progressBarStyle}
                        size="large"/>
                    :<Button onPress={ () => {
                        this.setState({loading:true})
                        this.props.onRefreshBtnPressed()
                    } }>Refresh</Button> 
                }
                <Text 
                    onPress={()=>{
                        this.setState({locationLabelExpanded: !this.state.locationLabelExpanded})
                    }}
                    style={styles.locationLabel}>{this.state.locationLabelExpanded?"Expanded address":address}</Text>
            </View>
            <CurrentForecast forecastData={currently}/>
            <View style={styles.buttonsContainer}>
                <Button onPress={ () => this.props.onHourlyBtnPressed() }>Hourly</Button>
                <Button onPress={ () => this.props.onDailyBtnPressed() }>Daily</Button>
            </View>
            <View style={{height:10}}>
            </View>
            <TouchableOpacity 
                onPress={openDarkSkyPromo.bind(this)}
                >
                <Text style={styles.darkSkyLabel}>Powered by Dark Sky</Text>
            </TouchableOpacity>
        </View>
    )
    }
}

const styles = {
    iconStyle: {
        width:60,
        height: 60
    },
    sceneContainer:{
        flexDirection:'column',
        justifyContent:'space-around'
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    headerInfo:{        
        alignItems:'center',
        justifyContent:'center'
    },
    locationLabel:{
        color:'black',
        fontSize:28
    },
    darkSkyLabel:{
        fontStyle:'italic',
        alignSelf:'center',
        fontWeight:'bold',
        color:'#babbbc',
        fontSize:20
    }
}
