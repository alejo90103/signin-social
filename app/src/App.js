// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView from "react-native-map-clustering";
import { Marker, Callout } from 'react-native-maps';

function onClusterPress(cluster, markers) {
  console.log(markers);
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 23.1165,
            longitude: -82.3882,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          }}
          // onClusterPress={onClusterPress}
        >
          <Marker
            coordinate={{ latitude: 23.1165, longitude: -82.3882 }}
          >
            <Callout>
              <Text>Jamon</Text>
              <Text>Pollo</Text>
            </Callout>
          </Marker>
          <Marker
            coordinate={{ latitude: 23.1167, longitude: -82.3884 }}
          >
            <Callout>
              <Text>Jamon</Text>
              <Text>Pollo</Text>
            </Callout>
          </Marker>
        </MapView>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
