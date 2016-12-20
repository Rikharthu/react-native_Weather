/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ListView, Navigator,TouchableHighlight } from 'react-native';
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
        this.setState({ weather: responseJSON });
      });
  }

  render() {
    // console.log(this.state.weather);

    const routes = [
      {name: 'home', index: 0},
      {name: 'hourly', index: 1}
    ]

    return (
      <Navigator
        initialRoute={{ name: 'home' }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.index === 0) {
                  return null;
                } else {
                  return (
                    <TouchableHighlight onPress={() => navigator.push(routes[1])}>
                      <Text>Back</Text>
                    </TouchableHighlight>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) =>
              { return (<Text>Done</Text>); },
              Title: (route, navigator, index, navState) =>
              { return (<Text>Awesome Nav Bar</Text>); },
            }}
            style={{ backgroundColor: 'gray' }}
            />
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
        return (
          <CurrentForecast />
        );
      case 'daily':
        return (
          <Text>daily</Text>
        );
      case 'hourly':

        return (
          // this.renderHourlyForecast()
          <HourlyForecast weather={this.state.weather} />
        );
    }
  }
}

const HourlyForecast = (props) => {
  console.log('rendering forecast')
  if (props.weather != null) {
    const {currently, hourly, daily} = props.weather;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    dataSource = ds.cloneWithRows(hourly.data);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => {
          // console.log(rowData);
          // console.log(dataSource);
          return <HourlyItem key={rowData.time} data={rowData} />
        }
        }
        renderFooter={() => <Button onPress={() => Linking.openURL("")}>More</Button>}
        />
    )
  } else {
    return <Text>Unable to load hourly forecast</Text>;
  }
}

const DailyForecast = (props) => {
  console.log('rendering forecast')
  if (props.weather != null) {
    const {currently, hourly, daily} = props.weather;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    dataSource = ds.cloneWithRows(hourly.data);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => {
          // console.log(rowData);
          // console.log(dataSource);
          return <HourlyItem key={rowData.time} data={rowData} />
        }
        }
        renderFooter={() => <Button onPress={() => Linking.openURL("")}>More</Button>}
        />
    )
  } else {
    return <Text>Unable to load hourly forecast</Text>;
  }
}

const CurrentForecast = (props) => {
  return (
    <View>
      <Text>Hello</Text>
      <Text>World</Text>
      <Text>!</Text>
    </View>
  );
}

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
};

AppRegistry.registerComponent('weather', () => weather);
