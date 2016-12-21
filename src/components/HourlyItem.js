import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import moment from 'moment';
import {icons} from '../assets';

const HourlyItem = ({data}) => {
    
    const {time,summary, temperature, humidity, precipProbability, icon} = data;
    console.log('time left until day end'+moment().endOf('day').from(moment.unix(time)))
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
        width:80,
        height: 80
    }
}

export default HourlyItem;
