import React from 'react';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import * as actions from '../actions';

class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  }

  static propTypes = {
    fetchJobs: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

    state = {
      mapLoaded: false,
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09,
      },
    }

    componentDidMount() {
      this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = (region) => {
      console.log(region);
    }

    onButtonPress = () => {
      this.props.fetchJobs(this.state.region, () => {
        this.props.navigation.navigate('deck');
      });
    }

    render() {
      if (!this.state.mapLoaded) {
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
          <View style={styles.buttonContainer}>
            <Button
              large
              title="Search this area"
              backgroundColor="#009688"
              icon={{ name: 'search' }}
              onPress={this.onButtonPress}
            />
          </View>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default connect(null, actions)(MapScreen);
