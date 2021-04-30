import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';

const Single = ({route}) => {
  const {data} = route.params;
  console.log('Single recipe data', data);
  return (
    <Card>
      <Text>{data}</Text>
    </Card>
  );
};
Single.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
  route: PropTypes.object,
};
export default Single;
