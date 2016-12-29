import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import moment from 'moment';
import {icons} from '../assets';

const HourlyItem = ({data}) => {
    
    const {time,summary, temperature, humidity, precipProbability, icon} = data;
    
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.date}>{moment.unix(time).calendar()}</Text>
            <View style={styles.rowCenteredContainer}>
                <Image source={icons.get(icon)} style={styles.iconStyle}/>                    
                <Text style={styles.summary}>{summary}</Text>
            </View>
            <View style={styles.rowCenteredContainer}>
                <Text style={styles.mediumText}>Temperature: </Text>
                <Text style={styles.temperature}>{parseFloat((temperature-32)/9*5).toFixed(1)} °C</Text>
            </View>
            <View style={styles.rowCenteredContainer}>
                <Text style={styles.mediumText}>Rain/Snow: </Text>
                <Text style={[styles.mediumText,styles.precipProbability]}>{parseFloat(precipProbability*100).toFixed(0)}%</Text>    
            </View>      
        </View>
    );
}

const styles = {
    containerStyle:{
        borderColor: '#000',
        marginLeft:5,
        marginRight:5,
        marginTop:6,
        marginBottom:6,
        alignItems:'center'
    },
    iconStyle: {
        width:40,
        height: 40
    },
    rowCenteredContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    date:{
        color:'black',
        fontSize:20
    },
    summary:{
        fontStyle:'italic',
        fontSize:20,
        marginLeft: 10
    },
    temperature:{
        fontWeight:'bold',
        color: 'black',
        fontSize: 20
    },
    humidity:{

    },
    precipProbability:{
        color:'black',
        fontWeight:'bold'
    },
    mediumText:{
        fontSize:18
    }
}

export default HourlyItem;
