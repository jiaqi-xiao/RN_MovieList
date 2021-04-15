/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {DataCall} from './utils/DataCall';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }),
      movies: [],
      viewType: 0,
    };
    this.inProgressNetworkReq = false;
    this._layoutProvider = new LayoutProvider(
      index => {
        return 0;
      },
      (type, dim) => {
        dim.width = Dimensions.get('window').width;
        dim.height = 100;
      },
    );
    this.fetchData();
  }

  async fetchData() {
    let movies = await DataCall.get().catch(err => {
      console.log(err);
    });
    let res = [];
    for (let i = 0; i < 1000; i++) {
      res.push(...movies);
    }
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(
        this.state.movies.concat(res),
      ),
    });
  }
  rowRenderer = (type, data) => {
    return (
      <View style={styles.itemRow}>
        <Image
          style={styles.logo}
          source={{
            uri: data.image,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </View>
    );
  };
  render() {
    //Only render RLV once you have the data
    return (
      <SafeAreaView style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          contentContainerStyle={{margin: 3}}
          onEndReached={this.handleListEnd}
          dataProvider={this.state.dataProvider}
          layoutProvider={this._layoutProvider}
          rowRenderer={this.rowRenderer}
          renderFooter={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
