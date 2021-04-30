import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles, {PINK} from './Styles';

export default () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color={PINK} />
  </View>
);
