import React from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import Slides from '../components/Slides';

const SLIDES_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' },
];

class WelcomeScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

    state = { token: null }

    onSlidesComplete = () => {
      this.props.navigation.navigate('auth');
    }

    async componentWillMount() {
      const token = await AsyncStorage.getItem('fb_token');

      if (token) {
        this.props.navigation.navigate('map');
        this.setState({ token });
      } else {
        this.setState({ token: false });
      }
    }

    render() {
      if (_.isNull(this.state.token)) {
        return <AppLoading />;
      }
      return (
        <View style={{ flex: 1 }}>
          <Slides data={SLIDES_DATA} onComplete={this.onSlidesComplete} />
        </View>
      );
    }

}

export default WelcomeScreen;
