/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const MovieImg = ({ imgUrl }) => {
  return (
    <Image
      style={styles.logo}
      source={{
        uri: 'https://api.androidhive.info/json/movies/11.jpg',
      }}
    />
  );
};

const MovieTitle = ({ title }) => {
  return (
    <Text style={styles.title}>{title}</Text>
  );
}

const BigArr = (props) => {
  var newArr = new Array();
  for (var i = 0; i < 1000; i++) {
    newArr.push(...props);
  }
  return newArr;
}

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
        <View style={{ flex: 1 }}>
          <Text style={[styles.title,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
          ]}>{item.title}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetch('https://api.androidhive.info/json/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <FlatList
        data={data}
        keyExtractor={item => item.title}
        
        renderItem={({ item }) => (
          <RenderItem title={item.title} url={item.image} />
        )}
      />
    </SafeAreaView>
  );
};

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
});

export default App;
