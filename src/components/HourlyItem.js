import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import moment from 'moment';


// Потому-что React-Native Bundler - замечательная вещь!
var icons = new Map();
icons.set("clear-day",require('../assets/clear-day.png'));
icons.set("wind",require('../assets/wind.png'));
icons.set("clear-night",require('../assets/clear-night.png'));
icons.set("cloudy",require('../assets/cloudy.png'));
icons.set("fog",require('../assets/fog.png'));
icons.set("partly-cloudy-day",require('../assets/partly-cloudy-day.png'));
icons.set("partly-cloudy-night",require('../assets/partly-cloudy-night.png'));
icons.set("rain",require('../assets/rain.png'));
icons.set("sleet",require('../assets/sleet.png'));
icons.set("snow",require('../assets/snow.png'));


const HourlyItem = ({data}) => {
    
    const {time,summary, temperature, humidity, precipProbability, icon} = data;

    return (
        <View style={styles.containerStyle}>
            <View>
                <Image source={icons.get(icon)} style={styles.iconStyle}/>
            </View>
            <View style={{marginLeft: 10}} >
                <Text>{moment.unix(time).calendar()}</Text>
                <Text>{summary}</Text>
                <Text>{parseFloat((temperature-32)/9*5).toFixed(1)} °C</Text>
                <Text>{humidity}</Text>
                <Text>{precipProbability*100}%</Text>            
            </View>
        </View>
    );
}

const styles = {
    containerStyle:{
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#000',
        flexDirection: 'row',
        elevation:1,
        marginLeft:5,
        marginRight:5,
        marginTop:4,
        marginBottom:4
    },
    iconStyle: {
        width:100,
        height: 100
    }
}

export default HourlyItem;
