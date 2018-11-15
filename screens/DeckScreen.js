import React from 'react';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends React.Component {

  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    }
  }

  static propTypes = {
    jobs: PropTypes.array,
    likJob: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  }

  _renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={job.jobTitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={false}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  _renderNoMoreCard = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back to Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this._renderCard}
          keyProp="jobkey"
          onSwipeRight={job => this.props.likJob(job)}
          renderNoMoreCards={this._renderNoMoreCard}
        />
      </SafeAreaView>
    );
  }

}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
};

export default connect(mapStateToProps, actions)(DeckScreen);
