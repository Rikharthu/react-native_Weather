/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ListView, Navigator } from 'react-native';
import Header from './src/components/Header';
import HourlyItem from './src/components/HourlyItem';
import moment from 'moment';
import Card from './src/components/Card';
import Button from './src/components/Button';
import CardSection from './src/components/CardSection';

export default class weather extends Component {

  state = {
    weather: null
  };

  darkSkyLink = 'https://www.darksky.net';

  componentWillMount() {
    fetch('https://api.darksky.net/forecast/53536b204bd8824a4c157697e0c24d7c/37.8267,-122.4233')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({weather: responseJSON});
      });
  }

  render() {
    console.log(this.state.weather);

    return (
        <Navigator
          initialRoute={{name:'home'}}
          renderScene={this.renderScene}
        />        
    );
  }

  // depending on the required scene name return different components
  renderScene(route, navigator){
    console.log('renderScene(), route='+route.name);
    switch(route.name){
      case 'home':
        return(
          <Text>HOME</Text>
        );
      case 'daily': 
        return(
          <Text>daily</Text>
        );
      case 'hourly': 
        return(
          <Text>Hourly</Text>
        );
    }
  }

  renderHourlyForecast() {
    console.log('rendering forecast')
    if(this.state.weather != null){
      const {currently, hourly, daily} = this.state.weather;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      dataSource = ds.cloneWithRows(hourly.data);
      return (
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => { 
              console.log(rowData);
              console.log(dataSource);
              return <HourlyItem key={rowData.time} data={rowData}/> 
            } 
          }
          renderFooter={()=><Button onPress={()=> Linking.openURL(this.darkSkyLink)}>More</Button>}
          />
        )
    }else{
      return <Text>Unable to load hourly forecast</Text>;
    }    
  }

  renderDailyForecast(){
    if(this.state.weather != null){
      const {daily} = this.state.weather;
      // TODO WTF?!?!?!?!?!
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // TODO WTF?!?!?!?!?!
      dataSource = ds.cloneWithRows(hourly.data);
      return (
        // hourly.data.map(forecastItem => 
        //   <HourlyItem key={forecastItem.time} data={forecastItem}/>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => <HourlyItem key={rowData.time} data={rowData}/>} />
        )
    }else{
      return <Text>Unable to load daily forecast</Text>;
    }
  }

}

const styles = {
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
};

AppRegistry.registerComponent('weather', () => weather);
