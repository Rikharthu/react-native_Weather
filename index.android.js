/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ListView, Navigator,TouchableHighlight, Image,BackAndroid } from 'react-native';
import Header from './src/components/Header';
import HourlyItem from './src/components/HourlyItem';
import DailyItem from './src/components/DailyItem';
import moment from 'moment';
import Card from './src/components/Card';
import Button from './src/components/Button';
import CardSection from './src/components/CardSection';
import CurrentForecast from './src/components/CurrentForecast';
import CurrentForecastScene from './src/scenes/CurrentForecastScene';


var routes = [
      {name: 'home', index: 0},
      {name: 'hourly', index: 1},
      {name: 'daily', index: 2}
  ]

// TODO how it works?
// ref={(nav) => { navigator = nav; }} ????
var navigator; 
// TODO how it works?
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
});

// object that contains props for navigation bar
var NavigationBarRouteMapper={
    LeftButton: function(route, navigator, index, navState){
      return (
        <Button
          onPress={()=>{
            console.log(routes[1])
            navigator.push(routes[1])
          }}>
          Left Button
        </Button>
      )
    },
    RightButton:function(route, navigator, index, navState){

    },
    Title: function(route, navigator, index, navState) {
      return <Text>Weather App</Text>
    }
  }

export default class weather extends Component {

  state = {
    weather: null
  };

  darkSkyLink = 'https://www.darksky.net';

  darkSkyAPIEndPoint(long, lat){
    return 'https://api.darksky.net/forecast/53536b204bd8824a4c157697e0c24d7c/'+long+','+lat;
  }

  componentWillMount() {
    this.refresh();
  }

  render() {
    // console.log(this.state.weather);
    console.log(this.state.weather)
    return (
      <Navigator
        ref={(nav) => { navigator = nav; }}
        initialRoute={routes[0]}
        renderScene={this.renderScene}
        onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
        configureScene={(route, routeStack) =>{
          console.log(route);
            switch(route.index){
              case(1):
                return Navigator.SceneConfigs.FloatFromLeft;
              case(2):
                return Navigator.SceneConfigs.FloatFromRight
            }
            return Navigator.SceneConfigs.FloatFromBottom;
          }
        }
        />
    );
  }

  // depending on the required scene name return different components
  // TODO поясни разницу между renderscene(){ } и renderscene= () =>{}  (второй вариант принадлежит классу ( биндит к нему, и следовательно state его))
  renderScene = (route, navigator) => {
    console.log('renderScene(), route=' + route.name);
    switch (route.name) {
      case 'home':
        if(this.state.weather!=null){
          return (
            <View style={{flex:1}}>
              <CurrentForecastScene                
                onRefreshBtnPressed={()=>this.refresh()}
                onHourlyBtnPressed={()=>this.hourlyButtonPressed(navigator)}
                onDailyBtnPressed={()=>this.dailyButtonPressed(navigator)}
                forecast={this.state.weather}/>              
            </View>
          );
        }else{
          return <Text>Unable to load curent forecast</Text>;
        }
      case 'daily':
        if(this.state.weather!=null){
          return (
            // this.renderHourlyForecast()
            <DailyForecast data={this.state.weather.daily} />
          );
        }else{
          return <Text>Unable to load daily forecast</Text>;
        }
      case 'hourly':
        if(this.state.weather!=null){
          return (
            // this.renderHourlyForecast()
            <HourlyForecast data={this.state.weather.hourly} />
          );
        }else{
          return <Text>Unable to load hourly forecast</Text>;
        }
    }
  }

  hourlyButtonPressed = (navigator) =>{
    console.log('hourly button pressed')
    navigator.push(routes[1]);
  }

  dailyButtonPressed = (navigator) =>{
    console.log('daily button pressed')
    navigator.push(routes[2]);
  }

  refresh= ()=>{
    console.log('refreshing data');
    fetch(this.darkSkyAPIEndPoint(56.9496,24.1052))
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ weather: responseJSON });
      });
  }
}

const HourlyForecast = (props) => {
  console.log('rendering forecast')
  const {data} = props;
  // ????
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  dataSource = ds.cloneWithRows(data.data);
  return (
    <ListView
      dataSource={dataSource}
      renderRow={(rowData) => {
        // console.log(rowData);
        // console.log(dataSource);
        return <HourlyItem key={rowData.time} data={rowData}/>
      }
      }
      renderFooter={() => <Button onPress={() => Linking.openURL("")}>More</Button>}
      />
  )  
}

const DailyForecast = (props) => {
 console.log('rendering DAILY forecast')
  const {data} = props;
  // ????
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  dataSource = ds.cloneWithRows(data.data);
  return (
    <ListView
      dataSource={dataSource}
      renderRow={(rowData) => {
        // console.log(rowData);
        // console.log(dataSource);
        return <DailyItem key={rowData.time} data={rowData} />
      }
      }
      renderFooter={() => <Button onPress={() => Linking.openURL("")}>More</Button>}
      />
  )  
}

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navbar:{
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000', // shadows do not work on android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
    // iphone would need an additional paddingTop: 15
  },
  iconStyle: {
    width:80,
    height: 80
  }
};

AppRegistry.registerComponent('weather', () => weather);
