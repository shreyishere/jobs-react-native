import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { clearLikedJobs } from '../actions';
import { Button } from 'react-native-elements';

class SettingsScreen extends React.Component {

  static propTypes = {
    clearLikedJobs: PropTypes.func
  }

  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }

}

export default connect(null, { clearLikedJobs })(SettingsScreen);
