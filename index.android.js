/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ListView, Navigator,TouchableHighlight, Image,BackAndroid,StatusBar, ActivityIndicator } from 'react-native';
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

const URL_BASE="https://accintern-test.apigee.net/v1/weather";
const API_KEY='nH9oQFiGQo1UK5daR2oYYzZkASBctoLb';

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
    location: { latitude:  55.88333, longitude: 26.53333},
    loadingState: "UNKNOWN"
  };

  darkSkyLink = 'https://www.darksky.net';


  componentDidMount() {
    this.updateLocation();
  }

  updateLocation = () =>{
    this.setState({loadingState: "LOCATION"})
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
  }

  render() {
    // console.log(this.state.weather);
    return (
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor="black"
          hidden={false}
          barStyle="light-content"/>
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
        </View>
    );
  }

  // depending on the required scene name return different components
  // TODO поясни разницу между renderscene(){ } и renderscene= () =>{}  (второй вариант принадлежит классу ( биндит к нему, и следовательно state его))
  renderScene = (route, navigator) => {
    loading = this.state.loadingState==="OK";
    console.log("loading: "+loading+this.state.loadingState)
    switch (route.name) {
      case 'home':
        if(this.state.weather!=null){
          return (
            <ScrollView>
              <CurrentForecastScene    
                loading={!loading}            
                onRefreshBtnPressed={()=>this.refreshButtonPressed()}
                onHourlyBtnPressed={()=>this.hourlyButtonPressed(navigator)}
                onDailyBtnPressed={()=>this.dailyButtonPressed(navigator)}
                forecast={this.state.weather}/>   
            </ScrollView>
          );
        }else{
          return this.LoadingScreen();
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
    this.setState({loadingState:"API_RESPONSE"})
    const {latitude, longitude} = this.state.location;
    this.refresh(latitude, longitude);
  }

  hourlyButtonPressed = (navigator) =>{
    navigator.push(routes[1]);
  }

  dailyButtonPressed = (navigator) =>{
    navigator.push(routes[2]);
  }

  refresh= (lat,long)=>{
    
    this.setState({loadingState: "API_RESPONSE"})
    apiURL=URL_BASE+"?lat="+lat+"&lng="+long;
    
    fetch(apiURL, {
        headers:{
          'apiKey':API_KEY
        }
      })
      .then(response => response.json())
      .then(responseJSON => {

        MyToastAndroid.show('Forecast refreshed!',MyToastAndroid.SHORT)
        // update btn
        this.setState({loadingState:"OK"});
        this.setState({ weather: responseJSON });
      }) .catch((error) => {
        handleNetworkError();
        console.log(error);
        // why cant use this.handleNetworkError() ?
      });
  }

  LoadingScreen = () =>{
    var msg;
    switch(this.state.loadingState){
              case "LOCATION":
                msg= <Text style={styles.loadingInfo}>Gettings Your current location...</Text>;
              case "API_RESPONSE":
                msg= <Text style={styles.loadingInfo}>Waiting for the forecast response...</Text>;
    }

    return (
      <View style={styles.progressBarContainer}>
        <Text style={styles.loadingLabel}>Loading</Text>
        <ActivityIndicator 
          style={styles.progressBarStyle}
          size="large"/>
          { 
            msg
          }
      </View>
    )
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
      renderSeparator={(sectionID,rowID,adjacentRowHighlighted ) =><View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#CCCCCC',
        }}
      />}
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
  progressBarContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  loadingLabel:{
    color:'black',
    fontSize:24
  },
  loadingInfo:{
    color:'gray'
  },
  progressBarStyle:{
    height:50,
    width:50
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
