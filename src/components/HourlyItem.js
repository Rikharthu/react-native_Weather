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
            <View>
                <Image source={icons.get(icon)} style={styles.iconStyle}/>
            </View>
            <View style={styles.infoContainer} >
                <Text style={styles.date}>{moment.unix(time).calendar()}</Text>
                <Text style={styles.summary}>{summary}</Text>
                <Text style={styles.temperature}>{parseFloat((temperature-32)/9*5).toFixed(1)} °C</Text>
                <Text style={styles.humidity}>{humidity}</Text>
                <Text style={styles.precipProbability}>{precipProbability*100}%</Text>            
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
        marginBottom:4,
        justifyContent:'center'
    },
    iconStyle: {
        width:80,
        height: 80
    },
    date:{
        color:'black',
        fontSize:20
    },
    summary:{

    },
    temperature:{

    },
    humidity:{

    },
    precipProbability:{

    }
}

export default HourlyItem;
