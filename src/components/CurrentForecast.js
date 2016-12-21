import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ListView, Navigator,TouchableHighlight, Image } from 'react-native';
import moment from 'moment';
import {icons} from '../assets';

const CurrentForecast = (props) => {
  const {time, summary, temperature, apparentTemperature, humidity, precipProbability, visibility,icon}=props.forecastData;
  return (
    <View style={styles.containerStyle}>      
      <Text style={styles.temperatureLabel}>At {moment.unix(time).format('LT')} it will be</Text>
      <View style={styles.temperatureDegreesContainer}>
        <Text style={styles.temperatureDegrees}>{parseFloat((temperature-32)/9*5).toFixed(0)}</Text>
        <Text style={styles.temperatureDegreesChar}>°</Text>
      </View>
      <Text  style={styles.temperatureFeelsLike}>Feels like {parseFloat((apparentTemperature-32)/9*5).toFixed(1)}°</Text>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.columnInfoContainer}>
          <Text>HUMIDITY</Text>
          <Text style={styles.additionalInfoValue}>{humidity*100}%</Text>
        </View>        
        <View style={styles.columnInfoContainer}>
          <Text>VISIBILITY</Text>
          <Text style={styles.additionalInfoValue}>{parseFloat(visibility*1.609344).toFixed(1)} km</Text>
        </View>
        <View style={styles.columnInfoContainer}>
          <Text>RAIN/SNOW</Text>
          <Text style={styles.additionalInfoValue}>{precipProbability*100}%</Text>
        </View>
      </View>
      <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:10}}>
        <Image source={icons.get(icon)} style={styles.iconStyle}/>                    
        <Text style={styles.summaryLabel}>{summary}</Text>
      </View>  
    </View>
  );
}

const styles = {
  iconStyle: {
    width:60,
    height: 60
  },
  temperatureDegreesContainer:{
    marginLeft:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  temperatureDegrees:{
    fontSize: 128,
    color: 'black',
  },
  temperatureDegreesChar:{
    fontSize: 128,
    color: 'gray',
  },
  temperatureLabel:{
    fontSize: 16,
    color:'gray'
  },
  temperatureFeelsLike:{
    fontSize: 16,
    color:'gray',
    marginBottom:20
  },
  containerStyle:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalInfoContainer:{
    alignSelf: 'stretch',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  additionalInfoValue:{
    color:'black',
    fontSize:20,
    fontWeight:'bold'
  },
  summaryLabel:{
    fontSize: 32,
    color:'black'
  },
  columnInfoContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default CurrentForecast;
