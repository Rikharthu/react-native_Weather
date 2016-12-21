import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import CurrentForecast from '../components/CurrentForecast';
import Button from '../components/Button';
import {icons} from '../assets';


function timezoneToText(timezone){
  return timezone.replace('/',', ').replace('_',' ');
}

const CurrentForecastScene = ({forecast, onHourlyBtnPressed, onDailyBtnPressed, onRefreshBtnPressed}) =>{
    const {currently, timezone}=forecast;


    return (
        <View style={styles.sceneContainer}>
            <View style={styles.headerInfo}>
                <Button onPress={ () => onRefreshBtnPressed() }>Refresh</Button>
                <Text style={styles.locationLabel}>{timezoneToText(timezone)}</Text>
            </View>
            <CurrentForecast forecastData={currently}/>
            <View style={styles.buttonsContainer}>
                <Button onPress={ () => onHourlyBtnPressed() }>Hourly</Button>
                <Button onPress={ () => onDailyBtnPressed() }>Daily</Button>
            </View>
        </View>
    )
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
    }
}

export default CurrentForecastScene;