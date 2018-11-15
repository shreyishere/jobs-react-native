import React from 'react';
import { MapView } from 'expo';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends React.Component {

  static propTypes = {
    likedJobs: PropTypes.array
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        title="Settings"
        onPress={() => {
          navigation.navigate('settings');
        }}
        backgroundColor="rbga(0,0,0,0)"
        color="rgb(0, 122, 255)"
      />
    ),
  })

  _renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { jobkey, company, formattedRelativeTime, url, jobTitle } = job;
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card key={jobkey} title={jobTitle}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={false}
              initialRegion={initialRegion}
            />
          </View>
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor="#03A9F4"
            onPress={() => Linking.openURL(url)}
          />
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this._renderLikedJobs()}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  italics: {
    fontStyle: 'italic'
  }
});

const mapStateToProps = ({ likedJobs }) => {
  return { likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
