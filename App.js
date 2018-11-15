import React from 'react';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import store from './store';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import AuthScreen from './screens/AuthScreen';
import ReviewScreen from './screens/ReviewScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const App = () => {
  const MainNavigator = createBottomTabNavigator({
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: {
      screen: createBottomTabNavigator({
        map: { screen: MapScreen },
        deck: { screen: DeckScreen },
        review: {
          screen: createStackNavigator({
            review: { screen: ReviewScreen },
            settings: { screen: SettingsScreen },
          }),
          navigationOptions: {
            title: 'Review Screen',
            tabBarIcon: ({ tintColor }) => {
              return <Icon name="favorite" size={30} color={tintColor} />;
            }
          }
        },
      }, {
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      }),
    },
  }, {
    lazy: true,
    navigationOptions: {
      tabBarVisible: false,
    },
  });
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainNavigator />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
