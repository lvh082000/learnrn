import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {navigate} from '../../navigation/root-navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getWidth, moderateScale} from '../../config';
import {createWork, getWorks} from '../../api/work-api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f4f6',
    flex: 1,
    // justifyContent: 'center',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
    marginBottom: moderateScale(18),
    marginTop: moderateScale(20),
  },
  input1: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3DEE8',
    fontSize: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    color: '#4F4F4F',
    marginHorizontal: moderateScale(18),
    height: moderateScale(48),
  },
  taikhoan: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
  touchableOpacity: {
    backgroundColor: '#025DD7',

    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(8),
    alignItems: 'center',
    height: moderateScale(48),
    justifyContent: 'center',
    marginHorizontal: moderateScale(18),
    marginTop: moderateScale(24),
  },
  text: {
    color: '#ffffff',
  },
  listContainer: {
    marginTop: moderateScale(20),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    marginHorizontal: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  itemTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  itemDescriber: {
    fontSize: moderateScale(18),
    // fontWeight: 'bold',
  },
});

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRoute();
  const [title, setTitle] = React.useState('');
  const [describe, setDescride] = React.useState('');

  const [works, setWorks] = useState([]);

  // const {user1} = router.params;
  // const {email, password} = user1;

  // const navigateAccount = () => {
  //   navigation.navigate('Account', {
  //     emailAddress: email,
  //   });
  // };

  // const navigateLogin = () => {
  //   navigation.navigate('Login', {
  //     backLogin: 'tro ve man hinh login',
  //   });
  // };

  const handleSubmit = async () => {
    const res = await createWork({
      title: title,
      describe: describe,
    });

    console.log({res});
    if (res.status === 200) {
      alert('success');
    }
  };

  const getData = async () => {
    const res = await getWorks();
    setWorks(res.data);
  };

  useEffect(() => {
    getData();
  }, [works]);

  return (
    <View style={styles.container}>
      {/* <Text>Home screen</Text> */}
      {/* <Text>User: {email}</Text> */}
      {/* <Text>Password: {password}</Text> */}
      {/* <Button title="go back to login" onPress={navigateLogin} /> */}
      {/* <Button title="go to account" onPress={navigateAccount} /> */}

      <TextInput
        style={styles.input}
        onChangeText={value => {
          setTitle(value);
        }}
        placeholder="Title"
        value={title}
      />

      <TextInput
        style={styles.input1}
        onChangeText={value => {
          setDescride(value);
        }}
        placeholder="Describe"
        value={describe}
      />
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleSubmit}>
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>

      <ScrollView>
        {works.map((work, index) => (
          <View style={styles.listContainer} key={index}>
            <Text style={styles.itemTitle}>{work.title}</Text>
            <Text style={styles.itemDescriber}>{work.describe}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
