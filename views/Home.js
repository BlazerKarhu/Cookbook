import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Navigator from '../navigation/Navigator';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Fuck</Text>
      <Button
        title="Click Me"
        onPress={() => navigation.navigate('Recipe Info')}
      ></Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};
