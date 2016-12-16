/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ListView} from 'react-native';
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

  componentWillMount() {
    fetch('https://api.darksky.net/forecast/53536b204bd8824a4c157697e0c24d7c/37.8267,-122.4' +
          '233')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({weather: responseJSON});
      });
  }

  render() {
    console.log(this.state.weather);

    return (
      <View style={styles.container}>
        <Header headerText={'Header'}/>
        <Button  onPress={()=> Linking.openURL('https://www.darksky.net')}>
          Open in Web
        </Button>
        {this.renderForecast()}
      </View>
    );
  }

  renderForecast() {
    if(this.state.weather != null){
      const {currently, hourly, daily} = this.state.weather;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      dataSource = ds.cloneWithRows(hourly.data);
      return (
        // hourly.data.map(forecastItem => 
        //   <HourlyItem key={forecastItem.time} data={forecastItem}/>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => <HourlyItem key={rowData.time} data={rowData}/>} />
        )
    }else{
      return <Text>Loading</Text>;
    }
  }

}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('weather', () => weather);
