import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import moment from 'moment';
import {icons} from '../assets';

const DailyItem = ({data}) => {
    
    const {time,summary, temperatureMin, temperatureMax, humidity, precipProbability, icon} = data;
    isToday = moment().isSame(moment.unix(time),'day')
    return (
        <View style={styles.containerStyle}>
            <View>
                <Image source={icons.get(icon)} style={styles.iconStyle}/>
            </View>
            <View style={{marginLeft: 10}} >
                <Text style={styles.dayName}>{isToday? 'Today' : moment.unix(time).format('dddd')}</Text>
                <Text style={styles.summaryLabel}>{summary}</Text>
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperatureMaxLabel}>{parseFloat((temperatureMax-32)/9*5).toFixed(1)}°</Text>
                    <Text style={styles.temperatureMinLabel}>{parseFloat((temperatureMin-32)/9*5).toFixed(1)}°</Text>
                </View>
            </View>
        </View>
    );
}

const styles = {
    containerStyle:{
        flexDirection: 'row',
        marginLeft:5,
        marginRight:5,
        marginTop:4,
        paddingRight:100,
        marginBottom:4,
        alignItems:'center'
    },
    iconStyle: {
        width:100,
        height: 100
    },
    summaryLabel:{
        flexWrap: "wrap",
        fontStyle:'italic'
    },
    dayName:{
        color:'black',
        fontSize:24
    },
    temperatureMinLabel:{
        color: 'gray',
        marginLeft:10,
        fontSize:16,
        fontWeight:'bold'
    },
    temperatureMaxLabel:{
        color:'black',
        fontSize:16,
        fontWeight:'bold'
    },
    temperatureContainer:{
        flexDirection:'row'
    }
}

export default DailyItem;
