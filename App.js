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
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [data, setData] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const RenderItem = item => {
    return (
      <View style={styles.itemRow}>
        <Image
          style={styles.logo}
          source={{
            uri: item.url,
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
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetch('https://api.androidhive.info/json/movies.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const bigArr = props => {
    let res = [];
    for (let i = 0; i < 1000; i++) {
      res.push(...props);
    }
    return res;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <FlatList
        data={bigArr(data)}
        // keyExtractor={item => item.title}
        renderItem={({item}) => (
          <RenderItem title={item.title} url={item.image} />
        )}
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
