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
// custom native module
import MyToastAndroid from './src/modules/MyToastAndroid';


var routes = [
      {name: 'home', index: 0},
      {name: 'hourly', index: 1},
      {name: 'daily', index: 2}
  ]

// TODO how it works?
// ref={(nav) => { navigator = nav; }} ????
var sceneNavigator; 
// TODO how it works?
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (sceneNavigator && sceneNavigator.getCurrentRoutes().length > 1) {
        sceneNavigator.pop();
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
    weather: null,
    location: { latitude:  55.88333, longitude: 26.53333}
  };

  darkSkyLink = 'https://www.darksky.net';

  darkSkyAPIEndPoint(long, lat){
    return 'https://api.darksky.net/forecast/53536b204bd8824a4c157697e0c24d7c/'+long+','+lat;
  }

  componentDidMount() {
    this.updateLocation();
  }

  updateLocation = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position.coords;
        this.setState({location:initialPosition});
        this.refresh(position.coords.latitude, position.coords.longitude)
      },
      (error) => MyToastAndroid.show(error,MyToastAndroid.SHORT),
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 60000}
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentWillMount() {
    const {latitude, longitude} = this.state.location;
    console.log('comp '+latitude+' '+longitude)
    this.refresh(latitude, longitude);
  }

  render() {
    // console.log(this.state.weather);
    return (
      <Navigator
        ref={(nav) => { sceneNavigator = nav; }}
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
            <ScrollView>
              <CurrentForecastScene                
                onRefreshBtnPressed={()=>this.refreshButtonPressed()}
                onHourlyBtnPressed={()=>this.hourlyButtonPressed(navigator)}
                onDailyBtnPressed={()=>this.dailyButtonPressed(navigator)}
                forecast={this.state.weather}/>   
            </ScrollView>
          );
        }else{
          return <Text>Loading</Text>;
        }
      case 'daily':
          return (
            // this.renderHourlyForecast()
            <DailyForecast data={this.state.weather.daily} />
          );
      case 'hourly':
          return (
            // this.renderHourlyForecast()
            <HourlyForecast data={this.state.weather.hourly} />
          );
    }
  }
  
  refreshButtonPressed = () =>{
    console.log('refresh button pressed')
    const {latitude, longitude} = this.state.location;
    this.refresh(latitude, longitude);
  }

  hourlyButtonPressed = (navigator) =>{
    console.log('hourly button pressed')
    navigator.push(routes[1]);
  }

  dailyButtonPressed = (navigator) =>{
    console.log('daily button pressed')
    navigator.push(routes[2]);
  }

  refresh= (lat,long)=>{
    console.log('refreshing data');
    fetch(this.darkSkyAPIEndPoint(lat,long))
      .then(response => response.json())
      .then(responseJSON => {
        MyToastAndroid.show('Forecast refreshed!',MyToastAndroid.SHORT)
        this.setState({ weather: responseJSON });
      }) .catch((error) => {
        handleNetworkError();
        console.log(error);
        // why cant use this.handleNetworkError() ?
      });
  }
}

handleNetworkError = ()=>{
  MyToastAndroid.show('No internet connection!',MyToastAndroid.SHORT)
  console.log('network error ');
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
      renderFooter={() => <Button onPress={() => Linking.openURL("http://darksky.net")}>More</Button>}
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
      renderFooter={() => <Button onPress={() => Linking.openURL("http://darksky.net")}>More</Button>}
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
