import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {navigate} from '../../navigation/root-navigation';
import {useNavigation, useRoute} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRoute();

  // const {user1} = router.params;
  // const {email, password} = user1;

  // const navigateAccount = () => {
  //   navigation.navigate('Account', {
  //     emailAddress: email,
  //   });
  // };

  const navigateLogin = () => {
    navigation.navigate('Login', {
      backLogin: 'tro ve man hinh login',
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text>Home screen</Text> */}
      {/* <Text>User: {email}</Text> */}
      {/* <Text>Password: {password}</Text> */}
      {/* <Button title="go back to login" onPress={navigateLogin} /> */}
      {/* <Button title="go to account" onPress={navigateAccount} /> */}
    </View>
  );
}
