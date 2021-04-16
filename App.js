/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  // FlatList,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const App: () => Node = () => {
  const [data, setData] = useState([]);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  );
  const [layoutProvider, setLayoutProvider] = useState(
    new LayoutProvider(
      index => {
        return 0;
      },
      (type, dim) => {
        dim.width = Dimensions.get('window').width;
        dim.height = 120;
      },
    ),
  );
  // const [viewType, setViewType] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  /////////////////////////////
  useEffect(() => {
    fetch('https://api.androidhive.info/json/movies.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
    setDataProvider(dataProvider => dataProvider.cloneWithRows(bigArr(data)));
  }, [data]);

  const bigArr = props => {
    let res = [];
    for (let i = 0; i < 1000; i++) {
      res.push(...props);
    }
    return res;
  };

  const rowRenderer = (type, data) => {
    return (
      <View style={styles.itemRow}>
        <Image
          style={styles.logo}
          source={{
            uri: data.image,
          }}
        />
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            {data.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RecyclerListView
        style={{felx: 1}}
        contentContainerStyle={{margin: 3}}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        renderAheadOffset={Dimensions.get('window').height * 2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default App;
