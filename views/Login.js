import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {Button, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, setInputs} = useState({
    username: '',
    password: '',
  });
  const logIn = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('userToken', 'abc');
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  };
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === 'abc') {
      setIsLoggedIn(true);
      props.navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <View>
      <Input
        placeholder="Username"
        onEndEditing={(text) => setInputs({username: text})}
      ></Input>
      <Input
        placeholder="Password"
        onEndEditing={(text) => setInputs({password: text})}
        secureTextEntry
      ></Input>
      <Button title="Login" onPress={() => logIn()}></Button>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
